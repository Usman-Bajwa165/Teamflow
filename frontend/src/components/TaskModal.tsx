"use client";
// frontend/src/components/TaskModal.tsx
import React, { useEffect, useState } from "react";

type Task = {
  id: string;
  title?: string | null;
  description?: string | null;
  assigneeId?: string | null;
  status?: "TODO" | "IN_PROGRESS" | "FINISHED" | null;
};

type TeamMember = {
  id: string;
  role?: string;
  user?: { id: string; name?: string | null; email?: string | null };
  busyElsewhere?: boolean;
};

type Props = {
  task: Task | null;
  projectId?: string | null;
  teamMembers?: TeamMember[];
  assignedUserIds?: string[];
  onClose: () => void;
  onSave: (updates: {
    title?: string;
    description?: string;
    assigneeId?: string | null;
    status?: Task["status"];
  }) => Promise<any>;
  onDelete: () => Promise<void>;
};

export default function TaskModal({
  task,
  teamMembers = [],
  assignedUserIds = [],
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [status, setStatus] = useState<Task["status"]>("TODO");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // initialize local editable state when task changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!task) return;
    setTitle(task.title ?? "");
    setDescription(task.description ?? "");
    setAssigneeId(task.assigneeId ?? null);
    setStatus((task.status as Task["status"]) ?? "TODO");
    setErr(null);
  }, [task]);

  if (!task) return null;

  // Build options: filter out members who already have a task in this same project,
  // except allow current assignee to remain selectable.
  const options = (teamMembers || [])
    .map((m) => {
      const user = m.user ?? { id: m.id, name: undefined, email: undefined };
      return { member: m, user };
    })
    .filter(({ user, member }) => {
      const isAssignedInThisProject = (assignedUserIds || []).includes(user.id);
      const isCurrentAssignee = task.assigneeId === user.id;
      if (isAssignedInThisProject && !isCurrentAssignee) return false;
      return true;
    });

  async function save() {
    setErr(null);
    setSaving(true);
    try {
      const payload = {
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        assigneeId: assigneeId || null,
        status,
      };
      const result = await onSave(payload);
      setSaving(false);
      onClose();
      return result;
    } catch (e: any) {
      setSaving(false);
      const msg = e?.body?.message ?? e?.message ?? "Save failed";
      setErr(msg);
      throw e;
    }
  }

  async function remove() {
    if (!confirm("Delete this task? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await onDelete();
      setDeleting(false);
      onClose();
    } catch (e: any) {
      setDeleting(false);
      const msg = e?.body?.message ?? e?.message ?? "Delete failed";
      setErr(msg);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">Edit task</h3>

        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

        <label className="block mb-2 text-sm">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />

        <label className="block mb-2 text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
          rows={5}
        />

        <label className="block mb-2 text-sm">Status</label>
        <select
          value={status ?? "TODO"}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full px-3 py-2 border rounded mb-3"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="FINISHED">FINISHED</option>
        </select>

        <label className="block mb-2 text-sm">Assignee</label>
        <select
          value={assigneeId ?? ""}
          onChange={(e) => setAssigneeId(e.target.value || null)}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="">Unassigned</option>
          {options.map(({ user, member }) => {
            const busyElsewhere = !!member.busyElsewhere;
            const label = `${user.name ?? user.email ?? user.id}${
              busyElsewhere ? " (busy elsewhere)" : ""
            }`;
            return (
              <option
                key={user.id}
                value={user.id}
                style={busyElsewhere ? { backgroundColor: "#ffecec" } : undefined}
              >
                {label}
              </option>
            );
          })}
        </select>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={save}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border"
              disabled={saving || deleting}
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              onClick={remove}
              className="px-3 py-2 rounded bg-red-600 text-white"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
