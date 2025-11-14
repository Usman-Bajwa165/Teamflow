"use client";
// frontend/src/app/teams/[id]/page.tsx
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { getTeamDetails as apiGetTeamDetails } from "../../../lib/api";

type UserBase = {
  id: string;
  email: string;
  name?: string | null;
  // optional helpers some admin endpoints return:
  _count?: { teamMembers?: number };
  teamIds?: string[]; // if backend provides array of team ids
};
type TeamMember = {
  id: string;
  role: "owner" | "admin" | "member" | string;
  user: UserBase;
};
type Team = {
  id: string;
  name: string;
  ownerId?: string | null;
  members?: TeamMember[];
  projects?: { id: string; name?: string; description?: string }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { user } = useAuth();

  // local state
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  // invite state
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin" | "owner">(
    "member"
  );
  const [usersList, setUsersList] = useState<UserBase[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [processingMemberId, setProcessingMemberId] = useState<string | null>(
    null
  );

  // delete-confirm UI state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteNameInput, setDeleteNameInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  if (!teamId) return <div>Invalid team id</div>;

  function authHeaders() {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("tf_access") : null;
    return {
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    };
  }

  // 1) load team (always)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setMsg(null);
      setLoading(true);
      try {
        const data = await apiGetTeamDetails(String(teamId));
        if (!mounted) return;
        setTeam(data as Team);
      } catch (err: unknown) {
        const e = err as { status?: number; body?: any } | Error;
        setMsg(
          (e as any)?.body?.message ||
            (e as Error).message ||
            "Failed to load team"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [teamId]);

  // 2) load users list ONLY if the signed-in user is a global admin.
  // This avoids hitting /admin/users (404) for non-admin users.
  useEffect(() => {
    let mounted = true;
    (async () => {
      setUsersList(null);
      if (!user?.role || user.role !== "admin") return;
      try {
        const res = await fetch(`${API_BASE}/admin/users`, {
          headers: authHeaders(),
        });
        if (!mounted) return;
        if (!res.ok) {
          // don't print to console — fail silently (admins can still manually invite)
          setUsersList(null);
          return;
        }
        const json = await res.json();
        // Expecting an array; if server returns wrapper, try to extract.
        let arr: UserBase[] = [];
        if (Array.isArray(json)) arr = json as UserBase[];
        else if (Array.isArray(json.users)) arr = json.users;
        else if (Array.isArray(json.data)) arr = json.data;
        else arr = json as UserBase[]; // best-effort
        if (mounted) setUsersList(arr);
      } catch {
        if (mounted) setUsersList(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user?.role]);

  const myUserId = user?.id ?? null;
  const myMembership = team?.members?.find((m) => m.user?.id === myUserId);
  const myRoleInTeam = myMembership?.role ?? null;
  const canManage =
    user?.role === "admin" ||
    myRoleInTeam === "owner" ||
    myRoleInTeam === "admin";

  const ownerName =
    team?.members?.find((m) => m.role === "owner")?.user?.name ??
    team?.members?.find((m) => m.role === "owner")?.user?.email ??
    team?.ownerId ??
    "—";

  async function reloadTeam() {
    setMsg(null);
    setLoading(true);
    try {
      const data = await apiGetTeamDetails(String(teamId));
      setTeam(data as Team);
    } catch (err: unknown) {
      const e = err as { status?: number; body?: any } | Error;
      setMsg(
        (e as any)?.body?.message ||
          (e as Error).message ||
          "Failed to reload team"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite(e?: React.FormEvent) {
    e?.preventDefault();
    setMsg(null);
    if (!canManage) {
      setMsg("Not permitted");
      return;
    }
    setProcessingMemberId("invite");
    try {
      let body: { email: string; role: string };
      if (selectedUserId && usersList) {
        const u = usersList.find((x) => x.id === selectedUserId);
        if (!u) throw new Error("Selected user not found");
        body = { email: u.email, role: inviteRole };
      } else {
        if (!inviteEmail) {
          setMsg("Enter email or select a user");
          setProcessingMemberId(null);
          return;
        }
        body = { email: inviteEmail, role: inviteRole };
      }

      const r = await fetch(`${API_BASE}/teams/${teamId}/invite`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        const parsed = (() => {
          try {
            return JSON.parse(txt);
          } catch {
            return null;
          }
        })();
        const message =
          parsed?.message ||
          parsed?.error ||
          txt ||
          `Invite failed (${r.status})`;
        setMsg(message);
        setProcessingMemberId(null);
        return;
      }

      setInviteEmail("");
      setSelectedUserId(null);
      setInviteRole("member");
      await reloadTeam();
      setMsg("Invitation/added successfully.");
    } catch (err: unknown) {
      setMsg((err as Error).message || "Network error");
    } finally {
      setProcessingMemberId(null);
    }
  }

  async function changeMemberRole(memberId: string, newRole: string) {
    if (!canManage) {
      setMsg("Not permitted");
      return;
    }
    setProcessingMemberId(memberId);
    try {
      const r = await fetch(
        `${API_BASE}/teams/${teamId}/members/${memberId}/role`,
        {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(txt || `Failed (${r.status})`);
      }
      await reloadTeam();
      setMsg("Role updated.");
    } catch (err: unknown) {
      setMsg((err as Error).message || "Failed to update role");
    } finally {
      setProcessingMemberId(null);
    }
  }

  async function demoteMember(member: TeamMember) {
    const mapping: Record<string, string | null> = {
      owner: "admin",
      admin: "member",
      member: null,
    };
    const next = mapping[member.role] ?? "member";
    if (!next) {
      setMsg("Cannot demote further");
      return;
    }
    await changeMemberRole(member.id, next);
  }

  async function removeMember(memberId: string) {
    if (!canManage) {
      setMsg("Not permitted");
      return;
    }
    if (!confirm("Remove this member from the team?")) return;
    setProcessingMemberId(memberId);
    try {
      const r = await fetch(`${API_BASE}/teams/${teamId}/members/${memberId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(txt || `Failed (${r.status})`);
      }
      await reloadTeam();
      setMsg("Member removed.");
    } catch (err: unknown) {
      setMsg((err as Error).message || "Failed to remove");
    } finally {
      setProcessingMemberId(null);
    }
  }

  function openDeleteForm() {
    setDeleteNameInput("");
    setShowDeleteConfirm(true);
    setMsg(null);
  }

  async function performDeleteTeam() {
    if (!team) return;
    if (deleteNameInput !== team.name) {
      setMsg("Typed name does not match exactly.");
      return;
    }
    setDeleting(true);
    try {
      const r = await fetch(`${API_BASE}/teams/${teamId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(txt || `Delete failed (${r.status})`);
      }
      router.push("/teams");
    } catch (err: unknown) {
      setMsg((err as Error).message || "Failed to delete team");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  function userIsInOtherTeam(u: UserBase) {
    // best-effort detection: when backend returned _count or teamIds
    const count =
      typeof u._count?.teamMembers === "number"
        ? u._count!.teamMembers
        : undefined;
    const teamIds = Array.isArray((u as any).teamIds)
      ? ((u as any).teamIds as string[])
      : undefined;
    const alreadyInThis = team?.members?.some((m) => m.user?.id === u.id);
    if (typeof count === "number") {
      return count > 0 && !alreadyInThis;
    }
    if (Array.isArray(teamIds)) {
      return teamIds.length > 0 && !alreadyInThis;
    }
    return false;
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/teams" className="text-sm text-blue-600">
          ← Back to teams
        </Link>
      </div>

      {loading && <div>Loading team...</div>}
      {msg && <div className="mb-3 text-red-600">{msg}</div>}

      {!loading && team && (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1">{team.name}</h2>
            <div>
              <strong>Owner:</strong> {ownerName}
            </div>
            <div>
              <strong>Members:</strong> {team.members?.length ?? 0}
            </div>
          </div>

          {canManage && (
            <div className="mb-4 p-3 border rounded">
              <h3 className="font-semibold mb-2">Add / invite member</h3>

              {usersList ? (
                <div className="flex gap-2 flex-wrap items-center">
                  <select
                    value={selectedUserId ?? ""}
                    onChange={(e) => setSelectedUserId(e.target.value || null)}
                    className="px-3 py-2 border rounded"
                    style={{ minWidth: 300 }}
                  >
                    <option value="">
                      -- Select a user (or leave blank to enter email) --
                    </option>
                    {usersList
                      .filter((u) => u.id !== myUserId)
                      .map((u) => {
                        const inOther = userIsInOtherTeam(u);
                        const disabled = team.members?.some(
                          (m) => m.user?.id === u.id
                        );
                        return (
                          <option
                            key={u.id}
                            value={u.id}
                            disabled={disabled}
                            style={{
                              backgroundColor: disabled
                                ? "#f0f0f0"
                                : inOther
                                ? "#ffecec"
                                : undefined,
                              color: inOther ? "#900" : undefined,
                            }}
                          >
                            {u.name ? `${u.name} — ${u.email}` : u.email}
                            {disabled
                              ? " (already in this team)"
                              : inOther
                              ? " (in other team)"
                              : ""}
                          </option>
                        );
                      })}
                  </select>

                  <input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Or enter email manually"
                    className="px-3 py-2 border rounded flex-1"
                  />

                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="px-2 py-2 border rounded"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                  </select>

                  <button
                    className="bg-green-600 text-white px-3 py-2 rounded"
                    onClick={(e) => handleInvite(e)}
                    disabled={
                      !!processingMemberId && processingMemberId !== "invite"
                    }
                  >
                    {processingMemberId === "invite"
                      ? "Working…"
                      : "Add / Invite"}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleInvite}
                  className="flex gap-2 flex-wrap items-center"
                >
                  <input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Email to invite"
                    className="px-3 py-2 border rounded"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="px-2 py-2 border rounded"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-2 rounded"
                  >
                    Invite
                  </button>
                </form>
              )}
            </div>
          )}

          <h3 className="text-lg mb-2">Members</h3>
          <ul className="space-y-2 mb-4">
            {team.members?.map((m) => (
              <li
                key={m.id}
                className="p-3 border rounded flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    {m.user?.name ?? m.user?.email}{" "}
                    <span className="ml-2 text-sm text-gray-600">
                      ({m.user?.email})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Role: {m.role}</div>
                </div>

                <div className="flex items-center gap-2">
                  {canManage ? (
                    <>
                      <button
                        className="px-2 py-1 border rounded text-sm"
                        onClick={() => {
                          const next =
                            m.role === "member"
                              ? "admin"
                              : m.role === "admin"
                              ? "owner"
                              : null;
                          if (!next) return;
                          changeMemberRole(m.id, next);
                        }}
                        disabled={!!processingMemberId}
                      >
                        {processingMemberId === m.id
                          ? "Working…"
                          : m.role === "member"
                          ? "Promote"
                          : m.role === "admin"
                          ? "Make owner"
                          : "Promote"}
                      </button>

                      {m.role !== "member" && (
                        <button
                          className="px-2 py-1 border rounded text-sm"
                          onClick={() => demoteMember(m)}
                          disabled={!!processingMemberId}
                        >
                          {processingMemberId === m.id ? "Working…" : "Demote"}
                        </button>
                      )}

                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                        onClick={() => {
                          if (m.user.id === myUserId) {
                            alert("You cannot remove yourself.");
                            return;
                          }
                          removeMember(m.id);
                        }}
                        disabled={
                          !!processingMemberId || m.user.id === myUserId
                        }
                      >
                        {processingMemberId === m.id ? "Working…" : "Remove"}
                      </button>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">View only</div>
                  )}
                </div>
              </li>
            ))}
            {(!team.members || team.members.length === 0) && (
              <div>No members yet</div>
            )}
          </ul>

          <h3 className="text-lg mb-2">Projects assigned</h3>
          <ul>
            {(team.projects || []).map((p) => (
              <li
                key={p.id}
                className="p-2 border rounded mb-2 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.description}</div>
                </div>
                <div>
                  <Link href={`/projects/${p.id}`} className="text-blue-600">
                    Open
                  </Link>
                </div>
              </li>
            ))}
            {(team.projects || []).length === 0 && (
              <div>No projects assigned</div>
            )}
          </ul>

          {(user?.role === "admin" || myRoleInTeam === "owner") && (
            <div className="mt-6">
              {!showDeleteConfirm ? (
                <button
                  className="bg-red-700 text-white px-3 py-2 rounded"
                  onClick={openDeleteForm}
                  disabled={deleting || processingMemberId === "delete-team"}
                >
                  Delete team
                </button>
              ) : (
                <div className="p-4 border rounded bg-yellow-50 max-w-xl">
                  <div className="mb-2">
                    <strong>Type the team name to confirm deletion:</strong>
                  </div>
                  <div className="mb-2">
                    This will permanently delete the team{" "}
                    <strong>{team.name}</strong> and{" "}
                    <strong>
                      will also delete projects assigned to this team
                    </strong>
                    .
                  </div>

                  <input
                    value={deleteNameInput}
                    onChange={(e) => setDeleteNameInput(e.target.value)}
                    placeholder="Type exact team name"
                    className="px-3 py-2 border rounded w-full mb-3"
                  />

                  <div className="flex gap-2">
                    <button
                      className="bg-red-700 text-white px-3 py-2 rounded"
                      onClick={() => performDeleteTeam()}
                      disabled={deleting || deleteNameInput !== team.name}
                    >
                      {deleting ? "Deleting…" : "Delete"}
                    </button>
                    <button
                      className="px-3 py-2 border rounded"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteNameInput("");
                      }}
                      disabled={deleting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
