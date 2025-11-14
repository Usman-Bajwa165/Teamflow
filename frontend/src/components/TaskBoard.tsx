// frontend/src/components/TaskBoard.tsx
'use client';
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './dnd/SortableItem';

export type Task = { id: string; title: string; position?: number; description?: string };
export type Column = { id: string; title: string; position?: number; tasks: Task[] };

type Props = {
  columns: Column[]; // controlled source of truth
  onMove: (taskId: string, targetColumnId: string, targetPosition: number) => Promise<void>;
  onColumnsChange?: (cols: Column[]) => void; // called for optimistic updates & rollbacks
  onAddTask?: (columnId: string, title: string) => Promise<void>;
  onOpenTask?: (taskId: string) => void;
};

function EmptyDropPad({ colId }: { colId: string }) {
  // give empty pad a distinct id so we can detect "over empty column" reliably
  const dropId = `empty-${colId}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropId });
  return (
    <div
      ref={setNodeRef}
      data-empty-pad
      style={{
        minHeight: 48,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isOver ? 0.7 : 0.08,
      }}
      className="bg-white/10"
    >
      {isOver ? 'Release to drop' : ''}
    </div>
  );
}

export default function TaskBoard({
  columns = [],
  onMove,
  onColumnsChange,
  onAddTask,
  onOpenTask,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [newTaskTitles, setNewTaskTitles] = useState<Record<string, string>>({});

  // helper to find column by either a task id or column id or empty-pad id
  function findColumnByContainedId(id: string) {
    // if id looks like 'empty-<colId>' treat as column id
    if (id.startsWith('empty-')) {
      const cid = id.slice('empty-'.length);
      const byCol = columns.find((c) => c.id === cid);
      if (byCol) return { column: byCol, matchedBy: 'empty-pad' as const, rawId: id };
    }

    // try task id
    const byTask = columns.find((c) => (c.tasks || []).some((t) => t.id === id));
    if (byTask) return { column: byTask, matchedBy: 'task' as const, rawId: id };

    // try column id
    const byCol = columns.find((c) => c.id === id);
    if (byCol) return { column: byCol, matchedBy: 'column' as const, rawId: id };

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

    const prevCols = columns.map((c) => ({ ...c, tasks: [...(c.tasks || [])] }));

    // same-column reorder (matched by task)
    if (sourceCol.id === destCol.id && sourceInfo.matchedBy === 'task' && destInfo.matchedBy === 'task') {
      const sourceIndex = sourceCol.tasks.findIndex((t) => t.id === activeId);
      const destIndex = destCol.tasks.findIndex((t) => t.id === overId);
      if (sourceIndex === -1 || destIndex === -1) return;

      const newTasks = arrayMove([...sourceCol.tasks], sourceIndex, destIndex);
      const newCols = columns.map((c) => (c.id === sourceCol.id ? { ...c, tasks: newTasks } : c));
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

    // destIndex: if over matched as task -> index of that task; if matched as empty-pad or column, drop at end
    let destIndex = dstTasks.findIndex((t) => t.id === overId);
    if (destIndex === -1) {
      // overId may be 'empty-<colId>' or the column id itself -> drop to end
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

  function handleDragStart(_e: DragStartEvent) {
    // reserved for future
  }

  async function handleAddTask(columnId: string) {
    const title = (newTaskTitles[columnId] || '').trim();
    if (!title) return;
    // clear input immediately for snappy UX
    setNewTaskTitles((s) => ({ ...s, [columnId]: '' }));
    if (onAddTask) {
      try {
        await onAddTask(columnId, title);
      } catch (err) {
        // if adding failed, surface nothing here — parent will show message
        // optionally restore title on failure
        setNewTaskTitles((s) => ({ ...s, [columnId]: title }));
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 px-2" style={{ minHeight: '60vh' }}>
          {columns.map((col) => (
            <div
              key={col.id}
              className="flex-shrink-0 bg-gray-100 rounded overflow-hidden"
              style={{
                width: 320,
                display: 'flex',
                flexDirection: 'column',
                height: '70vh', // fixed column height
              }}
            >
              {/* header (fixed) */}
              <div className="px-3 py-2 border-b bg-white" style={{ flexShrink: 0 }}>
                <div className="font-semibold text-sm truncate">{col.title}</div>
              </div>

              {/* body (scrolls) */}
              <div className="p-3 overflow-y-auto" style={{ flex: 1 }}>
                <SortableContext items={(col.tasks || []).map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {(col.tasks || []).length > 0 ? (
                      (col.tasks || []).map((t) => <SortableItem key={t.id} id={t.id} title={t.title} onOpen={() => onOpenTask?.(t.id)} />)
                    ) : (
                      // droppable pad for empty column (accept drops)
                      <EmptyDropPad colId={col.id} />
                    )}
                  </div>
                </SortableContext>
              </div>

              {/* footer - add task (fixed at bottom) */}
              <div className="p-3 border-t bg-white" style={{ flexShrink: 0 }}>
                <div className="flex gap-2">
                  <input
                    value={newTaskTitles[col.id] || ''}
                    onChange={(e) => setNewTaskTitles((prev) => ({ ...prev, [col.id]: e.target.value }))}
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
          ))}
        </div>
      </div>
    </DndContext>
  );
}
