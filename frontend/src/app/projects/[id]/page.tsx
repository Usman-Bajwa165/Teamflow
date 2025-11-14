"use client";
// frontend/src/app/projects/[id]/page.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getProject,
  createColumn,
  createTask,
  moveTask,
} from "../../../lib/api";
import TaskBoard, { Column } from "../../../components/TaskBoard";

export default function ProjectBoard() {
  const params = useParams();
  const projectId = params.id;
  const [project, setProject] = useState<any>(null);
  const [newColTitle, setNewColTitle] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!projectId) return;
      try {
        const p = await getProject(projectId);
        const normalized = {
          ...p,
          columns: (p?.columns || []).map((c: any) => ({
            ...c,
            tasks: c?.tasks || [],
          })),
        };
        setProject(normalized);
      } catch (err) {
        setMsg("Failed to load project");
      }
    })();
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

  // called by TaskBoard for optimistic updates & rollbacks
  function handleColumnsChange(cols: Column[]) {
    setProject((prev) => ({ ...(prev || {}), columns: cols }));
  }

  // forward to API
  async function handleMove(
    taskId: string,
    targetColumnId: string,
    targetPosition: number
  ) {
    await moveTask(taskId, targetColumnId, targetPosition);
  }

  // called by TaskBoard footer add-button
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
      throw err; // rethrow so TaskBoard can optionally react (we already cleared input)
    }
  }

  if (!project) return <div>Loading project...</div>;

  return (
    <div>
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
        onOpenTask={(taskId) => console.log("open task", taskId)}
      />
    </div>
  );
}
