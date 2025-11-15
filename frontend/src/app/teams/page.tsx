'use client';
// frontend/src/app/teams/page.tsx
import React, { useEffect, useState } from "react";
import { getMyTeams, createTeam } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

type TeamListItem = {
  id?: string | null;
  name: string;
  role: string;
  raw?: any;
  memberCount?: number;
  projectCount?: number;
};

export default function TeamsPage() {
  const { accessToken, user } = useAuth();
  const [teams, setTeams] = useState<TeamListItem[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function loadTeams() {
    if (!accessToken) return;
    try {
      const res = await getMyTeams();
      const normalized = (res || []).map((m: any) => {
        if (m && typeof m === "object" && m.team && typeof m.team === "object") {
          return {
            id: m.team.id ?? null,
            name: m.team.name ?? "—",
            role: m.role ?? "member",
            raw: m,
            memberCount: m.team._count?.members ?? (Array.isArray(m.team.members) ? m.team.members.length : undefined),
            projectCount: m.team._count?.projects ?? (Array.isArray(m.team.projects) ? m.team.projects.length : undefined),
          };
        }
        if (m && typeof m === "object" && (m.members || m.projects || m.name)) {
          return {
            id: m.id ?? null,
            name: m.name ?? "—",
            role: "admin",
            raw: m,
            memberCount: m._count?.members ?? (Array.isArray(m.members) ? m.members.length : undefined),
            projectCount: m._count?.projects ?? (Array.isArray(m.projects) ? m.projects.length : undefined),
          };
        }
        if (m && typeof m === "object" && (m.id || m.name)) {
          return {
            id: m.id ?? null,
            name: m.name ?? "—",
            role: m.role ?? "member",
            raw: m,
          };
        }
        return { id: null, name: "—", role: "member", raw: m };
      });
      setTeams(normalized);
    } catch (e) {
      console.error("Failed to fetch teams (getMyTeams) — raw error:", e);
      setMsg("Failed to fetch teams");
    }
  }

  useEffect(() => {
    loadTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  async function addTeam(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!user || user.role !== "admin") {
      setMsg("Only admins can create teams.");
      return;
    }
    if (!name || name.trim().length < 2) {
      setMsg("Team name must be at least 2 characters.");
      return;
    }
    setCreating(true);
    try {
      await createTeam(name.trim());
      setName("");
      await loadTeams(); // refresh runtime
      setMsg("Team created.");
    } catch (err: any) {
      console.error("createTeam error:", err);
      setMsg(err?.body?.message || "Failed to create team");
    } finally {
      setCreating(false);
    }
  }

  const totalTeams = teams.length;
  const totalMembers = teams.reduce((acc, t) => {
    const c = typeof t.memberCount === "number" ? t.memberCount : 0;
    return acc + c;
  }, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-sm text-gray-600 mt-1">Manage teams you belong to — quick overview & create new team.</p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-white shadow rounded p-3 min-w-[120px]">
            <div className="text-xs text-gray-500">Teams</div>
            <div className="text-xl font-semibold">{totalTeams}</div>
          </div>
          <div className="bg-white shadow rounded p-3 min-w-[140px]">
            <div className="text-xs text-gray-500">Known members (sum)</div>
            <div className="text-xl font-semibold">{totalMembers || '—'}</div>
          </div>
        </div>
      </header>

      {msg && <div className="text-sm text-red-600">{msg}</div>}

      {/* Always render the create-team section to keep DOM stable.
          If the user is not admin we show a disabled view and hint. */}
      <section className="bg-white shadow rounded p-4">
        <form onSubmit={addTeam} className="flex gap-3 items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New team name"
            className="px-3 py-2 border rounded w-full md:w-72"
            aria-label="new team name"
            disabled={user?.role !== "admin"}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow disabled:opacity-60"
            disabled={creating || user?.role !== "admin"}
          >
            {creating ? "Creating…" : "Create team"}
          </button>
        </form>

        {user?.role !== "admin" && (
          <div className="mt-2 text-xs text-gray-500">
            Only admins may create teams. If you need a team, ask an admin to create it.
          </div>
        )}
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.length === 0 && (
            <div className="p-6 bg-white rounded shadow text-center text-gray-500">You are not part of any teams yet.</div>
          )}

          {teams.map((t) => (
            <article
              key={t.id ?? Math.random()}
              className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{t.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">Role: <span className="font-medium">{t.role}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Members</div>
                    <div className="font-semibold">{t.memberCount ?? "—"}</div>
                  </div>
                </div>

                {t.raw?.team?.description && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{t.raw.team.description}</p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link href={t.id ? `/teams/${t.id}` : "#"} className="text-sm text-indigo-600 hover:underline">
                  Open team
                </Link>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs bg-slate-100 rounded border text-slate-600">{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
