"use client";
// frontend/app/teams/page.tsx
import React, { useEffect, useState } from "react";
import { getMyTeams, createTeam } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function TeamsPage() {
  const { accessToken } = useAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const res = await getMyTeams();
        setTeams(res);
      } catch (e) {
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
      // Re-fetch to get the same shape as getMyTeams()
      const res = await getMyTeams();
      setTeams(res || []);
    } catch (err: any) {
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
        {teams.map((m) => (
          <li
            key={m?.team?.id || m?.membershipId || Math.random()}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{m?.team?.name ?? "—"}</div>
              <div className="text-sm text-gray-600">
                Role: {m?.role ?? "member"}
              </div>
            </div>
            <div>
              <Link
                href={`/teams/${m?.team?.id}`}
                className="text-sm text-blue-600"
              >
                Open
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
