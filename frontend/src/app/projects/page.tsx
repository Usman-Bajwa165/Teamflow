"use client";
import React, { useEffect, useState } from "react";
import {
  createProject,
  listProjects,
  getMyTeams,
  getAllTeams,
  updateProject,
  deleteProject,
} from "../../lib/api";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function ProjectsListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [myTeams, setMyTeams] = useState<any[]>([]); // user's memberships

  useEffect(() => {
    (async () => {
      try {
        const res = await listProjects();
        setProjects(res || []);
      } catch (err) {
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
      } catch (err) {
        setTeams([]);
      }
    })();
  }, [isAdmin]);

  // helper: determine if current user can edit this project
  function canEditProject(p: any) {
    if (isAdmin) return true;
    if (!p?.team?.id) return false;
    // myTeams contains items shaped like { team: {...}, role: 'owner'|'admin'|'member' }
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
      setProjects((s) => [...s, p]);
      setName("");
      setDesc("");
      setDueDate("");
    } catch (err: any) {
      const errMsg = err?.body?.message || "Failed to create project";
      setMsg(errMsg);
    }
  }

  async function onDeleteProject(projectId: string) {
    if (!confirm("Type project name to confirm deletion:")) return;
    try {
      await deleteProject(projectId);
      setProjects((s) => s.filter((x) => x.id !== projectId));
    } catch (err: any) {
      alert(err?.body?.message || "Delete failed");
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Projects</h2>

      {isAdmin && (
        <form onSubmit={addProject} className="mb-6 space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-3 py-2 border rounded"
          />

          <div>
            <label className="text-sm block mb-1">
              Assign to team (required)
            </label>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">-- select team --</option>
              {teams.map((t) => (
                <option
                  key={t.team?.id ?? t.id}
                  value={t.team?.id ?? t.id}
                  style={{
                    backgroundColor: t.projectCount > 0 ? "#ffeef0" : undefined,
                  }}
                >
                  {t.team?.name ?? t.name}{" "}
                  {t.projectCount > 0 ? "(has projects)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm block mb-1">Due date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Create project
          </button>
        </form>
      )}

      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.description}</div>
              {p.team && (
                <div className="text-sm text-gray-500">Team: {p.team.name}</div>
              )}
            </div>

            <div className="flex gap-2">
              <Link href={`/projects/${p.id}`} className="text-blue-600">
                Open board
              </Link>

              {canEditProject(p) && (
                <Link
                  href={`/projects/${p.id}/edit`}
                  className="text-sm px-2 py-1 border rounded"
                >
                  Edit
                </Link>
              )}

              {canEditProject(p) && (
                <button
                  onClick={() => onDeleteProject(p.id)}
                  className="text-sm px-2 py-1 border rounded bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
