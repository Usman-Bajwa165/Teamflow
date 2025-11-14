"use client";
// frontend/src/components/TaskBoard.tsx
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./dnd/SortableItem";

export type Task = {
  id: string;
  title: string;
  position?: number;
  description?: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  status?: string | null; // server may return lowercase/uppercase
};
export type Column = {
  id: string;
  title: string;
  position?: number;
  tasks: Task[];
};

type Props = {
  columns: Column[]; // controlled source of truth
  onMove: (
    taskId: string,
    targetColumnId: string,
    targetPosition: number
  ) => Promise<void>;
  onColumnsChange?: (cols: Column[]) => void; // called for optimistic updates & rollbacks
  onAddTask?: (columnId: string, title: string) => Promise<void>;
  onOpenTask?: (taskId: string) => void;
  onDeleteColumn?: (columnId: string) => Promise<void>;
  isManager?: boolean;
};

function EmptyDropPad({ colId }: { colId: string }) {
  const dropId = `empty-${colId}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropId });
  return (
    <div
      ref={setNodeRef}
      data-empty-pad
      style={{
        minHeight: 48,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOver ? 0.7 : 0.08,
      }}
      className="bg-white/10"
    >
      {isOver ? "Release to drop" : ""}
    </div>
  );
}

export default function TaskBoard({
  columns = [],
  onMove,
  onColumnsChange,
  onAddTask,
  onOpenTask,
  onDeleteColumn,
  isManager = false,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const [newTaskTitles, setNewTaskTitles] = useState<Record<string, string>>(
    {}
  );

  function findColumnByContainedId(id: string) {
    if (id.startsWith("empty-")) {
      const cid = id.slice("empty-".length);
      const byCol = columns.find((c) => c.id === cid);
      if (byCol)
        return { column: byCol, matchedBy: "empty-pad" as const, rawId: id };
    }

    const byTask = columns.find((c) =>
      (c.tasks || []).some((t) => t.id === id)
    );
    if (byTask)
      return { column: byTask, matchedBy: "task" as const, rawId: id };

    const byCol = columns.find((c) => c.id === id);
    if (byCol)
      return { column: byCol, matchedBy: "column" as const, rawId: id };

    return null;
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const sourceInfo = findColumnByContainedId(activeId);
    const destInfo = findColumnByContainedId(overId);
    if (!sourceInfo || !destInfo) return;

    const sourceCol = sourceInfo.column;
    const destCol = destInfo.column;

    const prevCols = columns.map((c) => ({
      ...c,
      tasks: [...(c.tasks || [])],
    }));

    // same-column reorder
    if (
      sourceCol.id === destCol.id &&
      sourceInfo.matchedBy === "task" &&
      destInfo.matchedBy === "task"
    ) {
      const sourceIndex = sourceCol.tasks.findIndex((t) => t.id === activeId);
      const destIndex = destCol.tasks.findIndex((t) => t.id === overId);
      if (sourceIndex === -1 || destIndex === -1) return;

      const newTasks = arrayMove([...sourceCol.tasks], sourceIndex, destIndex);
      const newCols = columns.map((c) =>
        c.id === sourceCol.id ? { ...c, tasks: newTasks } : c
      );
      onColumnsChange?.(newCols);
      try {
        await onMove(activeId, destCol.id, destIndex);
      } catch {
        onColumnsChange?.(prevCols);
      }
      return;
    }

    // cross-column move
    const srcTasks = [...(sourceCol.tasks || [])];
    const dstTasks = [...(destCol.tasks || [])];

    const sourceIndex = srcTasks.findIndex((t) => t.id === activeId);
    if (sourceIndex === -1) return;

    let destIndex = dstTasks.findIndex((t) => t.id === overId);
    if (destIndex === -1) {
      destIndex = dstTasks.length;
    }

    const [moved] = srcTasks.splice(sourceIndex, 1);
    dstTasks.splice(destIndex, 0, moved);

    const newCols = columns.map((c) => {
      if (c.id === sourceCol.id) return { ...c, tasks: srcTasks };
      if (c.id === destCol.id) return { ...c, tasks: dstTasks };
      return c;
    });

    onColumnsChange?.(newCols);

    try {
      await onMove(activeId, destCol.id, destIndex);
    } catch {
      onColumnsChange?.(prevCols);
    }
  }

  function handleDragStart(_e: DragStartEvent) {}

  async function handleAddTask(columnId: string) {
    const title = (newTaskTitles[columnId] || "").trim();
    if (!title) return;
    setNewTaskTitles((s) => ({ ...s, [columnId]: "" }));
    if (onAddTask) {
      try {
        await onAddTask(columnId, title);
      } catch (err) {
        setNewTaskTitles((s) => ({ ...s, [columnId]: title }));
      }
    }
  }

  async function handleDeleteColumn(column: Column) {
    if ((column.tasks || []).length > 0) {
      alert("Cannot delete a column that contains tasks. Remove tasks first.");
      return;
    }
    if (!confirm(`Delete column "${column.title}"? This cannot be undone.`))
      return;
    if (!onDeleteColumn) return;
    try {
      await onDeleteColumn(column.id);
    } catch (err) {
      console.error("delete column failed", err);
      alert("Failed to delete column");
    }
  }

  // helper: normalize status string
  const statusOf = (t: Task) =>
    t.status ? String(t.status).toUpperCase() : "";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 px-2" style={{ minHeight: "60vh" }}>
          {columns.map((col) => {
            const inProgressCount = (col.tasks || []).filter(
              (t) => statusOf(t) === "IN_PROGRESS"
            ).length;
            const doneCount = (col.tasks || []).filter(
              (t) => statusOf(t) === "FINISHED"
            ).length;

            return (
              <div
                key={col.id}
                className="shrink-0 bg-gray-100 rounded overflow-hidden"
                style={{
                  width: 320,
                  display: "flex",
                  flexDirection: "column",
                  height: "70vh",
                }}
              >
                {/* header */}
                <div
                  className="px-3 py-2 border-b bg-white flex items-center justify-between"
                  style={{ flexShrink: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-sm truncate">
                      {col.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="mr-2">In-Progress: {inProgressCount}</span>
                      <span>Done: {doneCount}</span>
                    </div>
                  </div>

                  {isManager ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteColumn(col)}
                        className="text-sm text-red-600 px-2 py-1 border rounded"
                        title="Delete column (only if empty)"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>

                {/* body */}
                <div className="p-3 overflow-y-auto" style={{ flex: 1 }}>
                  <SortableContext
                    items={(col.tasks || []).map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {(col.tasks || []).length > 0 ? (
                        (col.tasks || []).map((t) => (
                          <SortableItem
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            assigneeName={t.assigneeName}
                            status={t.status}
                            onOpen={() => onOpenTask?.(t.id)}
                          />
                        ))
                      ) : (
                        <EmptyDropPad colId={col.id} />
                      )}
                    </div>
                  </SortableContext>
                </div>

                {/* footer */}
                <div
                  className="p-3 border-t bg-white"
                  style={{ flexShrink: 0 }}
                >
                  <div className="flex gap-2">
                    <input
                      value={newTaskTitles[col.id] || ""}
                      onChange={(e) =>
                        setNewTaskTitles((prev) => ({
                          ...prev,
                          [col.id]: e.target.value,
                        }))
                      }
                      placeholder={`New task in ${col.title}`}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleAddTask(col.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}
