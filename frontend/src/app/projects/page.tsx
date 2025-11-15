"use client";
import React, { useEffect, useState } from "react";
import {
  createProject,
  listProjects,
  getMyTeams,
  getAllTeams,
  deleteProject,
} from "../../lib/api";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "next/navigation";

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

export default function ProjectsListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [myTeams, setMyTeams] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await listProjects();
        setProjects(res || []);
      } catch {
        // ignore
      }

      try {
        if (isAdmin) {
          const all = await getAllTeams();
          setTeams(all || []);
        } else {
          const my = await getMyTeams();
          setTeams(my || []);
          setMyTeams(my || []);
          if ((my || []).length > 0) setSelectedTeamId(my[0]?.team?.id || "");
        }
      } catch {
        setTeams([]);
      }
    })();
  }, [isAdmin]);

  // show edited alert if redirected with ?edited=
  useEffect(() => {
    const ed = searchParams?.get("edited");
    if (ed) {
      setMsg(`Edited "${ed}" successfully.`);
    }
  }, [searchParams]);

  function canEditProject(p: any) {
    if (isAdmin) return true;
    if (!p?.team?.id) return false;
    return (myTeams || []).some(
      (m) =>
        (m.team?.id ?? m.id) === p.team.id &&
        ["owner", "admin"].includes(m.role)
    );
  }

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name || name.trim().length < 2) {
      setMsg("Project name must be at least 2 characters.");
      return;
    }
    if (!selectedTeamId) {
      setMsg("Please choose a team for this project.");
      return;
    }
    try {
      const p = await createProject(
        name.trim(),
        desc.trim(),
        selectedTeamId,
        dueDate || undefined
      );
      setProjects((s) => [p, ...s]);
      setName("");
      setDesc("");
      setDueDate("");
      setMsg("Project created.");
    } catch (err: any) {
      const errMsg = err?.body?.message || "Failed to create project";
      setMsg(errMsg);
    }
  }

  async function onDeleteProject(projectId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    const input = prompt(
      `To delete project "${project.name}" type the project name EXACTLY:`
    );
    if (!input || input !== project.name) {
      alert("Project name mismatch — deletion cancelled.");
      return;
    }
    try {
      await deleteProject(projectId);
      setProjects((s) => s.filter((x) => x.id !== projectId));
    } catch (err: any) {
      alert(err?.body?.message || "Delete failed");
    }
  }

  return (
    <div className="pt-4">
      {/* success / error banner */}
      {msg && (
        <div className="mb-4">
          <div className="rounded-md bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 shadow-sm">
            {msg}
            <button
              onClick={() => setMsg(null)}
              className="ml-4 text-xs px-2 py-1 bg-white rounded border"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Boards, teams and deadlines</p>
        </div>

        {isAdmin && (
          <div>
            <button
              onClick={() => setShowCreate((v) => !v)}
              className="px-3 py-2 rounded bg-indigo-600 text-white shadow hover:opacity-95"
            >
              {showCreate ? "Hide" : "New project"}
            </button>
          </div>
        )}
      </div>

      {/* Create form: compact multi-column */}
      {isAdmin && showCreate && (
        <div className="mb-6 bg-white border rounded p-4 shadow-sm">
          <form onSubmit={addProject} className="grid gap-3 grid-cols-1 md:grid-cols-4 items-end">
            {/* name */}
            <div className="md:col-span-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="mt-1 w-full max-w-md px-3 py-2 border rounded"
              />
            </div>

            {/* team select */}
            <div>
              <label className="text-xs font-extrabold text-slate-700">Team</label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded"
              >
                <option value="">-- select team --</option>
                {teams.map((t) => (
                  <option key={t.team?.id ?? t.id} value={t.team?.id ?? t.id}>
                    {t.team?.name ?? t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* due date compact */}
            <div>
              <label className="text-xs font-extrabold text-slate-700">Due</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            </div>

            {/* description spans full width */}
            <div className="md:col-span-4">
              <label className="text-xs font-extrabold text-slate-700">Description</label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Short description (optional)"
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="md:col-span-4 flex gap-2">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow">Create</button>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setDesc("");
                  setDueDate("");
                  setSelectedTeamId("");
                }}
                className="px-4 py-2 rounded border"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        <div className="bg-white border rounded p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">All projects</h3>

          <div className="grid gap-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border rounded p-3 hover:shadow-sm transition"
              >
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-slate-500">
                    {p.team?.name ?? "No team"} • Due: {formatDateShort(p.dueDate)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/projects/${p.id}`} className="text-indigo-600">
                    Open
                  </Link>
                  {canEditProject(p) && (
                    <Link href={`/projects/${p.id}/edit`} className="px-2 py-1 border rounded text-sm">
                      Edit
                    </Link>
                  )}
                  {canEditProject(p) && (
                    <button
                      onClick={() => onDeleteProject(p.id)}
                      className="px-2 py-1 rounded bg-rose-50 text-rose-600 border"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && <div className="text-sm text-slate-500">No projects yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
