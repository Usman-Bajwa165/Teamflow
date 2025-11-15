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
import { useAuth } from "../../../context/AuthContext";

type TaskShape = {
  id: string;
  title?: string;
  description?: string | null;
  assigneeId?: string | null;
  status?: "TODO" | "IN_PROGRESS" | "FINISHED" | null;
};
function formatDateShort(dateStr?: string | null) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}
export default function ProjectBoard() {
  const params = useParams();
  const projectId = params.id;
  const { user } = useAuth();
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
      setProject((prev) => (prev ? { ...prev, columns: [...prev.columns, newCol] } : prev));
      setNewColTitle("");
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to create column");
    }
  }

  function handleColumnsChange(cols: Column[]) {
    setProject((prev) => (prev ? { ...prev, columns: cols } : prev));
  }

  async function handleMove(taskId: string, targetColumnId: string, targetPosition: number) {
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
      setProject((prev) => {
        if (!prev) return prev;
        const cols = prev.columns.map((c: any) => (c.id === columnId ? { ...c, tasks: [...(c.tasks || []), t] } : c));
        return { ...prev, columns: cols };
      });
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
        if (!prev) return prev;
        const cols = prev.columns.map((c: any) => ({
          ...c,
          tasks: (c.tasks || []).map((t: any) => (t.id === taskId ? { ...t, ...updated } : t)),
        }));
        return { ...prev, columns: cols };
      });

      // refresh members
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
        if (!prev) return prev;
        const cols = prev.columns.map((c: any) => ({ ...c, tasks: (c.tasks || []).filter((t: any) => t.id !== taskId) }));
        return { ...prev, columns: cols };
      });
      setOpenTask(null);
    } catch (err: any) {
      setMsg(err?.body?.message || "Failed to delete task");
      throw err;
    }
  }

  async function handleDeleteColumn(columnId: string) {
    setMsg(null);
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
        if (!prev) return prev;
        return { ...prev, columns: prev.columns.filter((c: any) => c.id !== columnId) };
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

  const isManager = React.useMemo(() => {
    if (!user) return false;
    if (user.role === "admin") return true;
    const m = (teamMembers || []).find(
      (x: any) => (x.user?.id ?? x.id) === user.id && ["owner", "admin"].includes(x.role)
    );
    return !!m;
  }, [user, teamMembers]);

  if (!project) return <div className="pt-20 max-w-6xl mx-auto px-4">Loading project...</div>;

  const totalTasks = project.columns?.reduce((acc: number, c: any) => acc + (c.tasks?.length || 0), 0) ?? 0;
  const finishedTasks = project.columns?.reduce((acc: number, c: any) => acc + (c.tasks?.filter((t: any) => t.status === "FINISHED").length || 0), 0) ?? 0;
  const progress = totalTasks === 0 ? 0 : Math.round((finishedTasks / totalTasks) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-start">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">{project.name}</h2>
          <p className="text-sm text-slate-500 mt-1">{project.description}</p>
          <div className="flex items-center gap-3 mt-3 text-sm">
            {project.team && <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">{project.team.name}</span>}
            {project.dueDate && <span className="text-sm text-slate-600">Due {formatDateShort(project.dueDate)}</span>}
            <span className="text-sm text-slate-600">Tasks: {totalTasks}</span>
          </div>
        </div>

        <div className="min-w-[220px] bg-white border rounded p-4 shadow-sm">
          <div className="text-sm text-slate-500">Progress</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
              <div style={{ width: `${progress}%` }} className="h-3 bg-indigo-600 rounded" />
            </div>
            <div className="text-sm font-medium">{progress}%</div>
          </div>

          <div className="mt-3 text-sm">
            <div>Members: {teamMembers.length}</div>
            <div>Status: <span className="ml-2 font-medium">{project.status ?? "Active"}</span></div>
          </div>
        </div>
      </div>

      {msg && <div className="mb-3 text-rose-600">{msg}</div>}

      <div className="mb-4">
        <form onSubmit={addColumn} className="flex gap-2 items-center">
          <input
            value={newColTitle}
            onChange={(e) => setNewColTitle(e.target.value)}
            placeholder="New column title"
            className="px-3 py-2 border rounded flex-1"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add column</button>
        </form>
      </div>

      <div className="bg-white border rounded p-4 shadow-sm">
        <TaskBoard
          columns={project.columns as Column[]}
          onMove={handleMove}
          onColumnsChange={handleColumnsChange}
          onAddTask={handleAddTask}
          onOpenTask={handleOpenTask}
          onDeleteColumn={handleDeleteColumn}
          isManager={isManager}
        />
      </div>

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
