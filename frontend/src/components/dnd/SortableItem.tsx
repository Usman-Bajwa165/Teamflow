// frontend/src/components/dnd/SortableItem.tsx
'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, title, onOpen }: { id: string; title: string; onOpen?: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-white rounded border flex items-center justify-between">
      <div className="text-sm truncate">{title}</div>
      <button onClick={onOpen} className="text-xs text-slate-500 ml-2">⋯</button>
    </div>
  );
}
