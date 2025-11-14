'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({
  id,
  title,
  onOpen,
  assigneeName,
  status,
}: {
  id: string;
  title: string;
  onOpen?: () => void;
  assigneeName?: string | null;
  status?: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const statusUpper = status ? String(status).toUpperCase() : '';

  // normalize assignee label — treat empty/whitespace as "Unassigned"
  const assigneeLabel =
    typeof assigneeName === 'string' && assigneeName.trim().length > 0
      ? assigneeName.trim()
      : 'Unassigned';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 rounded border ${statusUpper === 'FINISHED' ? 'bg-green-100' : 'bg-white'}`}
      role="button"
      onClick={() => onOpen && onOpen()}
    >
      <div className="font-medium">{title}</div>
      <div className="text-xs text-gray-600 mt-1">
        <span>Assigned to: {assigneeLabel}</span>
        <span className="mx-2">•</span>
        <span>Status: {statusUpper || 'TODO'}</span>
      </div>
    </div>
  );
}
