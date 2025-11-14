"use client";
// frontend/src/app/projects/[id]/edit/page.tsx
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import {
  getProject,
  updateProject,
  deleteProject,
  getAllTeams,
  getMyTeams,
} from "../../../../lib/api";

type TeamShape = { id: string; name?: string; projectCount?: number };
type ProjectShape = {
  id: string;
  name: string;
  description?: string | null;
  teamId?: string | null;
  dueDate?: string | null;
};

export default function ProjectEditPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [project, setProject] = useState<ProjectShape | null>(null);
  const [teams, setTeams] = useState<TeamShape[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [teamId, setTeamId] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const p = await getProject(id);
        setProject(p);
        setName(p.name || "");
        setDesc(p.description || "");
        setTeamId(p.teamId || "");
        setDueDate(p.dueDate ? (p.dueDate as string).split("T")[0] : "");
      } catch (_err) {
        setMsg("Failed to load project");
      }
    })();
    (async () => {
      try {
        if (isAdmin) {
          const all = await getAllTeams();
          // normalize expected shapes
          setTeams(
            (all || []).map((t: any) => ({
              id: t.team?.id ?? t.id,
              name: t.team?.name ?? t.name,
              projectCount: t.projectCount ?? 0,
            }))
          );
        } else {
          const my = await getMyTeams();
          setTeams(
            (my || []).map((m: any) => ({
              id: m.team?.id ?? m.id,
              name: m.team?.name ?? m.name,
            }))
          );
          if ((my || []).length > 0 && !teamId) {
            setTeamId((my[0].team?.id ?? my[0].id) as string);
          }
        }
      } catch {
        setTeams([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAdmin]);

  if (!id) return <div>Invalid project id</div>;
  if (msg) return <div className="text-red-600">{msg}</div>;
  if (!project) return <div>Loading...</div>;

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      // API expects dueDate as string (ISO date) or null
      const updates = {
        name: name.trim(),
        description: desc.trim(),
        teamId: teamId || null,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      };
      const updated = await updateProject(project.id, updates);
      setProject(updated);
      setMsg("Saved.");
    } catch (err: any) {
      setMsg(err?.body?.message || "Save failed");
    }
  }

  async function onDeleteConfirmed() {
    if (deleteConfirmName !== project.name) {
      setMsg("Project name mismatch — type the project name to confirm.");
      return;
    }
    try {
      await deleteProject(project.id);
      setShowDeleteModal(false);
      router.push("/projects");
    } catch (err: any) {
      setMsg(err?.body?.message || "Delete failed");
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Edit project</h2>

      <form onSubmit={onSave} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          value={desc ?? ""}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />

        <div>
          <label className="text-sm block mb-1">Assign to team</label>
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- none --</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm block mb-1">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 rounded border bg-red-50"
          >
            Delete project
          </button>
          <Link
            href={`/projects/${project.id}`}
            className="px-4 py-2 rounded border"
          >
            Back
          </Link>
        </div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative z-10 bg-white p-6 rounded shadow max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-3">Confirm delete</h3>
            <p className="mb-3">
              Type the project name <strong>{project.name}</strong> to confirm
              deletion.
            </p>
            <input
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteConfirmed}
                className="px-3 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
