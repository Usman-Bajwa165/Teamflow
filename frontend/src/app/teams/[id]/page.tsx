"use client";
// frontend/src/app/teams/[id]/page.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import {
  getTeamDetails as apiGetTeamDetails,
  getProject,
} from "../../../lib/api";

type UserBase = {
  id: string;
  email: string;
  name?: string | null;
  _count?: { teamMembers?: number };
  teamIds?: string[];
};
type TeamMember = {
  id: string;
  role: "owner" | "admin" | "member" | string;
  user: UserBase;
};
type ProjectShort = {
  id: string;
  name?: string;
  description?: string;
  columns?: any[];
  tasks?: any[];
};

type Team = {
  id: string;
  name: string;
  ownerId?: string | null;
  members?: TeamMember[];
  projects?: ProjectShort[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { user } = useAuth();

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin" | "owner">(
    "member"
  );
  const [usersList, setUsersList] = useState<UserBase[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [processingMemberId, setProcessingMemberId] = useState<string | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteNameInput, setDeleteNameInput] = useState("");

  if (!teamId) return <div>Invalid team id</div>;

  function authHeaders() {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("tf_access") : null;
    return {
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    };
  }

  async function loadTeam() {
    setMsg(null);
    setLoading(true);
    try {
      const data = await apiGetTeamDetails(String(teamId));
      setTeam(data as Team);

      const projs = (data as any)?.projects;
      if (Array.isArray(projs) && projs.length > 0) {
        try {
          const detailed = await Promise.all(
            projs.map(async (p: any) => {
              if (!p?.id) return p;
              try {
                const full = await getProject(p.id);
                return full;
              } catch {
                return p;
              }
            })
          );
          setTeam((prev) => ({ ...(prev || {}), projects: detailed }));
        } catch {
          // ignore
        }
      }
    } catch (err: unknown) {
      const e = err as { status?: number; body?: any } | Error;
      setMsg(
        (e as any)?.body?.message ||
          (e as Error).message ||
          "Failed to load team"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  // admin users list (only if global admin)
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
          setUsersList(null);
          return;
        }
        const json = await res.json();
        let arr: UserBase[] = [];
        if (Array.isArray(json)) arr = json as UserBase[];
        else if (Array.isArray(json.users)) arr = json.users;
        else if (Array.isArray(json.data)) arr = json.data;
        else arr = json as UserBase[];
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

  const ownerName = useMemo(() => {
    const owner = team?.members?.find((m) => m.role === "owner");
    return owner?.user?.name ?? owner?.user?.email ?? team?.ownerId ?? "—";
  }, [team]);

  // collect all tasks across team's projects
  const allProjectTasks = useMemo(() => {
    const tasks: any[] = [];
    (team?.projects || []).forEach((p: any) => {
      if (Array.isArray(p.tasks) && p.tasks.length)
        tasks.push(
          ...p.tasks.map((t: any) => ({
            ...t,
            projectId: p.id,
            projectName: p.name,
          }))
        );
      else if (Array.isArray(p.columns)) {
        p.columns.forEach((c: any) => {
          if (Array.isArray(c.tasks))
            tasks.push(
              ...c.tasks.map((t: any) => ({
                ...t,
                projectId: p.id,
                projectName: p.name,
              }))
            );
        });
      }
    });
    return tasks;
  }, [team]);

  // map userId => tasks array
  const memberTaskMap = useMemo(() => {
    const map = new Map<string, any[]>();
    (team?.members || []).forEach((m) => map.set(m.user.id, []));
    allProjectTasks.forEach((t) => {
      const aId = t.assigneeId ?? t.assignee?.id;
      if (aId && map.has(aId)) {
        map.get(aId)!.push(t);
      }
    });
    return map;
  }, [team, allProjectTasks]);

  const totalMembers = team?.members?.length ?? 0;
  const totalProjects = team?.projects?.length ?? 0;
  const totalTasks = allProjectTasks.length;
  const availableMembers =
    team?.members?.filter(
      (m) => (memberTaskMap.get(m.user.id) || []).length === 0
    ).length ?? 0;

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
      await loadTeam();
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
      await loadTeam();
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
      await loadTeam();
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
    const count =
      typeof u._count?.teamMembers === "number"
        ? u._count!.teamMembers
        : undefined;
    const teamIds = Array.isArray((u as any).teamIds)
      ? ((u as any).teamIds as string[])
      : undefined;
    const alreadyInThis = team?.members?.some((m) => m.user?.id === u.id);
    if (typeof count === "number") return count > 0 && !alreadyInThis;
    if (Array.isArray(teamIds)) return teamIds.length > 0 && !alreadyInThis;
    return false;
  }

  function computeProgressForTasks(tasks: any[]) {
    if (!tasks || tasks.length === 0) return { percent: 0, total: 0, done: 0 };
    const total = tasks.length;
    const done = tasks.filter(
      (t) => String(t.status || "").toUpperCase() === "FINISHED"
    ).length;
    const percent = Math.round((done / total) * 100);
    return { percent, total, done };
  }

  return (
    <div className="space-y-6">
      {loading && <div className="text-sm text-gray-600">Loading team...</div>}
      {msg && <div className="text-sm text-red-600">{msg}</div>}

      {!loading && team && (
        <>
          <header className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">{team.name}</h2>
              <div className="text-sm text-gray-600 mt-1">
                Owner: <span className="font-medium">{ownerName}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-gray-50 p-3 rounded text-center min-w-[110px]">
                <div className="text-xs text-gray-500">Members</div>
                <div className="text-lg font-semibold">{totalMembers}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center min-w-[110px]">
                <div className="text-xs text-gray-500">Projects</div>
                <div className="text-lg font-semibold">{totalProjects}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center min-w-[140px]">
                <div className="text-xs text-gray-500">Tasks (team)</div>
                <div className="text-lg font-semibold">{totalTasks}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Available: {String(availableMembers)}
                </div>
              </div>
            </div>
          </header>

          {/* Manage / invite */}
          {canManage && (
            <section className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-3">Add / invite member</h3>

              {usersList ? (
                <div className="flex gap-2 flex-wrap items-center">
                  <select
                    value={selectedUserId ?? ""}
                    onChange={(e) => setSelectedUserId(e.target.value || null)}
                    className="px-3 py-2 border rounded min-w-[280px]"
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
                                ? "#fff0f0"
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
                    className="px-3 py-2 border rounded flex-1 min-w-[220px]"
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
            </section>
          )}

          {/* Members & workload (including per-member task list) */}
          <section className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Members & workload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(team.members || []).map((m) => {
                const tasksForMember = memberTaskMap.get(m.user.id) || [];
                const prog = computeProgressForTasks(tasksForMember);
                const available = tasksForMember.length === 0;

                const showPromote = m.role === "member" || m.role === "admin";
                const showDemote = m.role === "owner" || m.role === "admin";
                const promoteLabel =
                  m.role === "member"
                    ? "Promote"
                    : m.role === "admin"
                    ? "Make owner"
                    : "Promote";

                return (
                  <div
                    key={m.id}
                    className="p-3 border rounded flex flex-col md:flex-row md:items-start md:justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      {/* top row: name + email (left), role (right) */}
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-3">
                            <div className="font-semibold truncate">
                              {m.user?.name ?? m.user?.email}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              ({m.user?.email})
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-4 flex items-center gap-2">
                          <div className=" font-bold mr-2">
                            Role
                          </div>
                          <div className="text-sm text-gray-500 truncate mr-10">
                            {m.role}
                          </div>
                        </div>
                      </div>

                      {/* tasks list */}
                      <div className="mt-3">
                        <div className="text-xs text-gray-500">
                          Tasks assigned ({tasksForMember.length})
                        </div>
                        {tasksForMember.length === 0 ? (
                          <div className="text-sm text-gray-500 mt-1">
                            No tasks
                          </div>
                        ) : (
                          <ul className="mt-2 space-y-1">
                            {tasksForMember.map((t: any) => (
                              <li key={t.id} className="text-sm text-slate-700">
                                <span className="font-medium">
                                  {t.projectName ?? t.projectId}
                                </span>
                                <span className="mx-2 text-gray-400">—</span>
                                <span>{t.title ?? "Untitled task"}</span>
                                <span className="ml-2 text-xs text-gray-400">
                                  ({String(t.status || "TODO")})
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* actions (right column) */}
                    <div className="md:w-56 flex flex-col items-end gap-3">
                      <div className="flex gap-2">
                        {canManage ? (
                          <>
                            {showPromote && (
                              <button
                                className="px-2 py-1 border rounded text-sm min-w-24 text-center"
                                onClick={() => {
                                  const next =
                                    m.role === "member"
                                      ? "admin"
                                      : m.role === "admin"
                                      ? "owner"
                                      : undefined;
                                  if (!next) return;
                                  changeMemberRole(m.id, next);
                                }}
                                disabled={!!processingMemberId}
                              >
                                {processingMemberId === m.id
                                  ? "…"
                                  : promoteLabel}
                              </button>
                            )}

                            {showDemote && (
                              <button
                                className="px-2 py-1 border rounded text-sm"
                                onClick={() => demoteMember(m)}
                                disabled={!!processingMemberId}
                              >
                                {processingMemberId === m.id ? "…" : "Demote"}
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
                              {processingMemberId === m.id ? "…" : "Remove"}
                            </button>
                          </>
                        ) : (
                          <div className="text-sm text-gray-500">View only</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {(!team.members || team.members.length === 0) && (
                <div className="text-sm text-gray-500">No members yet</div>
              )}
            </div>
          </section>

          {/* Projects assigned */}
          <section className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Projects assigned</h3>
            <div className="space-y-3">
              {(team.projects || []).map((p: any) => {
                let projTasks: any[] = [];
                if (Array.isArray(p.tasks) && p.tasks.length)
                  projTasks = p.tasks;
                else if (Array.isArray(p.columns)) {
                  p.columns.forEach((c: any) => {
                    if (Array.isArray(c.tasks)) projTasks.push(...c.tasks);
                  });
                }
                const summary = computeProgressForTasks(projTasks);
                return (
                  <div
                    key={p.id}
                    className="p-3 border rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold">{p.name ?? "—"}</div>
                      <div className="text-sm text-gray-500">
                        {p.description}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        Tasks: {projTasks.length}
                      </div>
                      <div className="text-sm font-medium">
                        {summary.percent}% done
                      </div>
                      <div className="mt-2">
                        <Link
                          href={`/projects/${p.id}`}
                          className="text-indigo-600 text-sm"
                        >
                          Open
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {(team.projects || []).length === 0 && (
                <div className="text-sm text-gray-500">
                  No projects assigned
                </div>
              )}
            </div>
          </section>

          {/* delete team */}
          {(user?.role === "admin" || myRoleInTeam === "owner") && (
            <section className="mt-4">
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
                    <strong>also delete projects assigned to this team</strong>.
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
            </section>
          )}
        </>
      )}
    </div>
  );
}
