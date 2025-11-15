'use client';
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
  busyElsewhere?: boolean | number | null;
};

type Props = {
  task: Task | null;
  projectId?: string | null;
  teamMembers?: TeamMember[];
  assignedUserIds?: string[]; // users assigned in THIS project
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
  useEffect(() => {
    if (!task) return;
    setTitle(task.title ?? "");
    setDescription(task.description ?? "");
    setAssigneeId(task.assigneeId ?? null);
    setStatus((task.status as Task["status"]) ?? "TODO");
    setErr(null);
  }, [task]);

  if (!task) return null;

  // Build options: map members -> { user, member }, filter out members who already have
  // a task in THIS project (assignedUserIds) except allow current assignee to remain selectable.
  const options = (teamMembers || [])
    .map((m) => {
      const user = m.user ?? { id: m.id, name: undefined, email: undefined };
      return { member: m, user };
    })
    .filter(({ user }) => {
      const isAssignedInThisProject = (assignedUserIds || []).includes(user.id);
      const isCurrentAssignee = task.assigneeId === user.id;
      if (isAssignedInThisProject && !isCurrentAssignee) return false;
      return true;
    });

  async function save() {
    setErr(null);
    setSaving(true);
    try {
      // normalize assigneeId: treat "", "null", undefined as null
      let assigneeForPayload: string | null = assigneeId ?? null;
      if (assigneeForPayload === "" || assigneeForPayload === "null") assigneeForPayload = null;

      // If task marked FINISHED we also clear assignee (as requested)
      if (status === "FINISHED") assigneeForPayload = null;

      const payload = {
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        assigneeId: assigneeForPayload,
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

  // helper to display label and indicator (🔴) when busyElsewhere
  const optionLabel = (user: { id?: string; name?: string | null; email?: string | null }, busy?: boolean) => {
    const nameOrEmailOrId = (user.name && user.name.trim()) || (user.email && user.email.trim()) || user.id || 'Unknown';
    return busy ? `🔴 ${nameOrEmailOrId} (busy elsewhere)` : nameOrEmailOrId;
  };

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
          onChange={(e) => {
            const v = e.target.value;
            setAssigneeId(v === "" ? null : v);
          }}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="">Unassigned</option>
          {options.map(({ user, member }) => {
            const busyElsewhere = !!(member as any).busyElsewhere;
            const label = optionLabel(user, busyElsewhere);

            // inline style is a hint; some browsers ignore option styling — emoji ensures visibility
            return (
              <option
                key={user.id}
                value={user.id}
                style={busyElsewhere ? { backgroundColor: "#fff0f0" } : undefined}
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
