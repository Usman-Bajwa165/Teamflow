"use client";
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
};

export default function TeamsPage() {
  const { accessToken } = useAuth();
  const [teams, setTeams] = useState<TeamListItem[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const res = await getMyTeams();
        // res may be:
        // - an array of membership objects { team: {...}, role: 'member', ... }
        // - an array of team objects (when admin) { id, name, members, ... }
        const normalized = (res || []).map((m: any) => {
          // If object has `.team` then it's a membership row
          if (
            m &&
            typeof m === "object" &&
            m.team &&
            typeof m.team === "object"
          ) {
            return {
              id: m.team.id ?? null,
              name: m.team.name ?? "—",
              role: m.role ?? "member",
              raw: m,
            };
          }

          // If object looks like a team (has members/projects or name)
          if (
            m &&
            typeof m === "object" &&
            (m.members || m.projects || m.name)
          ) {
            return {
              id: m.id ?? null,
              name: m.name ?? "—",
              role: "admin", // when admin listing teams, role isn't per-team; treat as admin view
              raw: m,
            };
          }

          // fallback: if it's a membership-like object with id/name at top-level
          if (m && typeof m === "object" && (m.id || m.name)) {
            return {
              id: m.id ?? null,
              name: m.name ?? "—",
              role: m.role ?? "member",
              raw: m,
            };
          }

          // last resort: unknown shape
          console.warn("Unknown team item shape:", m);
          return {
            id: null,
            name: "—",
            role: "member",
            raw: m,
          };
        });

        setTeams(normalized);
      } catch (e) {
        console.error("Failed to fetch teams (getMyTeams) — raw error:", e);
        setMsg("Failed to fetch teams");
      }
    })();
  }, [accessToken]);

  async function addTeam(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name || name.trim().length < 2) {
      setMsg("Team name must be at least 2 characters.");
      return;
    }
    try {
      await createTeam(name.trim());
      setName("");
      const res = await getMyTeams();
      const normalized = (res || []).map((m: any) => {
        if (m && m.team) {
          return {
            id: m.team.id ?? null,
            name: m.team.name ?? "—",
            role: m.role ?? "member",
            raw: m,
          };
        }
        if (m && (m.members || m.projects || m.name)) {
          return {
            id: m.id ?? null,
            name: m.name ?? "—",
            role: "admin",
            raw: m,
          };
        }
        if (m && (m.id || m.name)) {
          return {
            id: m.id ?? null,
            name: m.name ?? "—",
            role: m.role ?? "member",
            raw: m,
          };
        }
        return { id: null, name: "—", role: "member", raw: m };
      });
      setTeams(normalized || []);
    } catch (err: any) {
      console.error("createTeam error:", err);
      const errMsg = err?.body?.message || "Failed to create team";
      setMsg(errMsg);
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">My teams</h2>
      {msg && <div className="mb-3 text-red-600">{msg}</div>}
      <form onSubmit={addTeam} className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New team name"
          className="px-3 py-2 border rounded flex-1"
        />
        <button className="bg-green-600 text-white px-3 py-2 rounded">
          Create
        </button>
      </form>

      <ul className="space-y-2">
        {teams.length === 0 && <div>No teams yet</div>}
        {teams.map((t) => (
          <li
            key={t.id ?? Math.random()}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-600">Role: {t.role}</div>
            </div>
            <div>
              {t.id ? (
                <Link href={`/teams/${t.id}`} className="text-sm text-blue-600">
                  Open
                </Link>
              ) : (
                <span className="text-sm text-gray-400">No id</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
