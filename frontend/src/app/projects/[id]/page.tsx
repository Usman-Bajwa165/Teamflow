"use client";
// frontend/src/app/projects/[id]/page.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getProject,
  createColumn,
  createTask,
  moveTask,
  updateTask,
  deleteTask,
  getTeamMembers,
  deleteColumn,
} from "../../../lib/api";
import TaskBoard, { Column } from "../../../components/TaskBoard";
import TaskModal from "../../../components/TaskModal";
import { useAuth } from "../../../context/AuthContext"; // adjust path if different

type TaskShape = {
  id: string;
  title?: string;
  description?: string | null;
  assigneeId?: string | null;
  status?: "TODO" | "IN_PROGRESS" | "FINISHED" | null;
};

export default function ProjectBoard() {
  const params = useParams();
  const projectId = params.id;
  const { user } = useAuth(); // expects { id, role } in auth context; if your useAuth differs, adapt
  const [project, setProject] = useState<any | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [newColTitle, setNewColTitle] = useState("");
  const [openTask, setOpenTask] = useState<any | null>(null);

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    (async () => {
      try {
        const p = await getProject(projectId);
        const normalized = {
          ...p,
          columns: (p?.columns || []).map((c: any) => ({
            ...c,
            tasks: c?.tasks || [],
          })),
        };
        if (cancelled) return;
        setProject(normalized);

        if (normalized.teamId) {
          try {
            const members = await getTeamMembers(normalized.teamId);
            if (!cancelled) setTeamMembers(members || []);
          } catch {
            if (!cancelled) setTeamMembers([]);
          }
        } else {
          setTeamMembers([]);
        }
      } catch (err) {
        if (!cancelled) setMsg("Failed to load project");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  async function addColumn(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const title = (newColTitle || "").trim();
    if (!title) {
      setMsg("Column title required");
      return;
    }
    try {
      const col = await createColumn(project.id, title);
      const newCol = { ...col, tasks: col?.tasks || [] };
      setProject((prev) => ({
        ...(prev || {}),
        columns: (prev?.columns || []).concat(newCol),
      }));
      setNewColTitle("");
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to create column");
    }
  }

  function handleColumnsChange(cols: Column[]) {
    setProject((prev) => ({ ...(prev || {}), columns: cols }));
  }

  async function handleMove(
    taskId: string,
    targetColumnId: string,
    targetPosition: number
  ) {
    try {
      await moveTask(taskId, targetColumnId, targetPosition);
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to move task");
      throw err;
    }
  }

  async function handleAddTask(columnId: string, title: string) {
    setMsg(null);
    try {
      const t = await createTask(columnId, title);
      setProject((prev) => ({
        ...(prev || {}),
        columns: (prev?.columns || []).map((c: any) =>
          c.id === columnId ? { ...c, tasks: [...(c.tasks || []), t] } : c
        ),
      }));
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to create task");
      throw err;
    }
  }

  function handleOpenTask(taskId: string) {
    if (!project) return;
    for (const col of project.columns || []) {
      const t = (col.tasks || []).find((x: TaskShape) => x.id === taskId);
      if (t) {
        setOpenTask({ ...t, columnId: col.id });
        return;
      }
    }
  }

  async function handleSaveTask(updates: {
    title?: string;
    description?: string;
    assigneeId?: string | null;
    status?: TaskShape["status"];
  }) {
    if (!openTask) throw new Error("no task open");
    setMsg(null);
    const taskId = openTask.id;
    try {
      const updated = await updateTask(taskId, updates);
      setProject((prev) => {
        const cols = (prev?.columns || []).map((c: any) => ({
          ...c,
          tasks: (c.tasks || []).map((t: any) =>
            t.id === taskId ? { ...t, ...updated } : t
          ),
        }));
        return { ...(prev || {}), columns: cols };
      });

      // refresh team members (to update any busy flags)
      if (project?.teamId) {
        try {
          const members = await getTeamMembers(project.teamId);
          setTeamMembers(members || []);
        } catch {
          // ignore
        }
      }

      setOpenTask((prev: any) => ({ ...(prev || {}), ...updated }));
      return updated;
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to save task");
      throw err;
    }
  }

  async function handleDeleteTask() {
    if (!openTask) throw new Error("no task open");
    const taskId = openTask.id;
    try {
      await deleteTask(taskId);
      setProject((prev) => {
        const cols = (prev?.columns || []).map((c: any) => ({
          ...c,
          tasks: (c.tasks || []).filter((t: any) => t.id !== taskId),
        }));
        return { ...(prev || {}), columns: cols };
      });
      setOpenTask(null);
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to delete task");
      throw err;
    }
  }

  // delete column handler
  async function handleDeleteColumn(columnId: string) {
    setMsg(null);
    // find column and ensure empty
    const col = (project?.columns || []).find((c: any) => c.id === columnId);
    if (!col) {
      setMsg("Column not found");
      return;
    }
    if ((col.tasks || []).length > 0) {
      setMsg("Cannot delete column that contains tasks. Remove tasks first.");
      return;
    }
    if (!confirm("Delete this column?")) return;
    try {
      await deleteColumn(columnId);
      setProject((prev) => {
        return {
          ...(prev || {}),
          columns: (prev?.columns || []).filter((c: any) => c.id !== columnId),
        };
      });
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to delete column");
    }
  }

  function computeAssignedUserIds() {
    if (!project) return [];
    const ids: string[] = [];
    for (const c of project.columns || []) {
      for (const t of c.tasks || []) {
        if (t.assigneeId) ids.push(t.assigneeId);
      }
    }
    return [...new Set(ids)];
  }

  // compute isManager: global admin or team owner/admin membership
  const isManager = React.useMemo(() => {
    if (!user) return false;
    if (user.role === "admin") return true;
    // check teamMembers for a member entry for current user with owner/admin role
    const m = (teamMembers || []).find(
      (x: any) =>
        (x.user?.id ?? x.id) === user.id && ["owner", "admin"].includes(x.role)
    );
    return !!m;
  }, [user, teamMembers]);

  if (!project) return <div>Loading project...</div>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      {msg && <div className="mb-3 text-red-600">{msg}</div>}

      <div className="mb-4">
        <form onSubmit={addColumn} className="flex gap-2">
          <input
            value={newColTitle}
            onChange={(e) => setNewColTitle(e.target.value)}
            placeholder="New column title"
            className="px-3 py-2 border rounded flex-1"
          />
          <button className="bg-slate-600 text-white px-3 py-2 rounded">
            Add column
          </button>
        </form>
      </div>

      <TaskBoard
        columns={project.columns as Column[]}
        onMove={handleMove}
        onColumnsChange={handleColumnsChange}
        onAddTask={handleAddTask}
        onOpenTask={handleOpenTask}
        onDeleteColumn={handleDeleteColumn}
        isManager={isManager}
      />

      <TaskModal
        task={openTask}
        projectId={project.id}
        teamMembers={teamMembers || []}
        assignedUserIds={computeAssignedUserIds()}
        onClose={() => setOpenTask(null)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
