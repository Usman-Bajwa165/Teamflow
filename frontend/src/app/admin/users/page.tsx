"use client";
import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  createUserAsAdmin,
  updateUserRole,
  deleteUser,
} from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

type User = {
  id: string;
  email: string;
  name?: string | null;
  role: "member" | "admin" | "owner" | string;
};

export default function AdminUsersPage() {

  
  const { user } = useAuth();
  const currentUserId = user?.id ?? null;
  const isAdmin = user?.role === "admin";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // create form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"member" | "admin" | "owner">("member");

  // local processing states
  const [creating, setCreating] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // hydration guard to avoid server/client mismatch
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // fetch users only after hydrated AND if admin
  useEffect(() => {
    // always run effect (hook order stable), but early return keeps behavior same
    if (!hydrated || !isAdmin) return;

    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await getAllUsers();
        const list = Array.isArray(res) ? res : [];
        // hide current logged-in user from admin list (as requested)
        const filtered = list.filter(
          (u: any) => String(u.id) !== String(currentUserId)
        );
        if (!alive) return;
        setUsers(filtered);
      } catch (e: any) {
        setErr("Failed to load users");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [hydrated, isAdmin, currentUserId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email || !email.includes("@")) {
      setErr("Please provide a valid email.");
      return;
    }
    if (!password || password.length < 7) {
      setErr("Password must be at least 7 characters.");
      return;
    }

    setCreating(true);
    try {
      const created = await createUserAsAdmin({
        email: email.trim(),
        password,
        name: name.trim() || undefined,
        role,
      });
      if (created && String(created.id) !== String(currentUserId)) {
        setUsers((s) => [created, ...s]);
      }
      setEmail("");
      setPassword("");
      setName("");
      setRole("member");
    } catch (e: any) {
      // Surface backend reason if present, otherwise fallback to message
      const reason =
        e?.body?.message ||
        e?.message ||
        (typeof e === "string" ? e : JSON.stringify(e));
      // Common backend message normalization
      if (/(email.*already|already.*exists|duplicate)/i.test(String(reason))) {
        setErr("Email already exists — choose another email.");
      } else {
        setErr(String(reason));
      }
    } finally {
      setCreating(false);
    }
  }

  async function changeRolePromoteDemote(u: User) {
    if (!u) return;
    // single promote/demote button behaviour
    const target =
      u.role === "member" ? "admin" : u.role === "admin" ? "member" : null;
    if (!target) return;
    setProcessingId(u.id);
    setErr(null);
    try {
      const updated = await updateUserRole(u.id, target);
      setUsers((s) => s.map((x) => (x.id === u.id ? updated : x)));
    } catch (e: any) {
      const reason =
        e?.body?.message ||
        e?.message ||
        (typeof e === "string" ? e : JSON.stringify(e));
      setErr(String(reason));
    } finally {
      setProcessingId(null);
    }
  }

  async function removeUser(id: string) {
    if (!confirm("Delete user? This cannot be undone.")) return;
    setProcessingId(id);
    try {
      await deleteUser(id);
      setUsers((s) => s.filter((u) => u.id !== id));
    } catch (e: any) {
      const reason =
        e?.body?.message ||
        e?.message ||
        (typeof e === "string" ? e : JSON.stringify(e));
      setErr(String(reason));
    } finally {
      setProcessingId(null);
    }
  }

  if (!hydrated) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-4 text-center">User Management</h2>
        <div className="bg-white shadow rounded p-4">
          <div className="h-8 bg-gray-100 rounded mb-3 w-1/3" />
          <div className="space-y-2">
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // now hydrated: check admin
  if (!isAdmin) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-4 text-center">User Management</h2>
        <div className="text-red-600">Access denied.</div>
      </div>
    );
  }

  // actual admin UI
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">User Management</h2>

      {err && <div className="mb-4 text-red-600 text-center font-bold">{err}</div>}

      <form
        onSubmit={handleCreate}
        className="mb-6 bg-white shadow rounded p-4"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="email"
            className="px-3 py-2 h-10 border rounded w-full md:w-60 text-sm"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 7 chars)"
            type="password"
            aria-label="password"
            className="px-3 py-2 h-10 border rounded w-full md:w-56 text-sm"
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (optional)"
            aria-label="name"
            className="px-3 py-2 h-10 border rounded w-full md:w-56 text-sm"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="px-3 py-2 h-10 border rounded text-sm"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              {/* <option value="owner">Owner</option> */}
            </select>
          </div>

          {/* Create button */}
          <button
            type="submit"
            disabled={creating}
            className="bg-indigo-600 text-white px-5 py-2 h-10 rounded shadow hover:bg-indigo-700 disabled:opacity-60 md:ml-auto"
          >
            {creating ? "Creating…" : "Create user"}
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={() => {
              setEmail("");
              setPassword("");
              setName("");
              setRole("member");
              setErr(null);
            }}
            className="px-5 py-2 h-10 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="bg-white shadow rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">All users</h3>
          <div className="text-sm text-gray-500">{users.length} users</div>
        </div>

        {loading ? (
          <div>Loading users…</div>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto">
            <ul className="space-y-2">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="p-3 border rounded flex items-center justify-between hover:shadow-sm transition"
                >
                  <div>
                    <div className="text-lg font-medium">
                      {u.name || "—"}{" "}
                      <span className="ml-2 text-sm text-gray-500">
                        {u.email}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Role: {u.role}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {u.role !== "owner" && (
                      <button
                        onClick={() => changeRolePromoteDemote(u)}
                        className="px-3 py-1 border rounded text-sm bg-emerald-50 hover:bg-emerald-100"
                        disabled={processingId === u.id}
                        title={
                          u.role === "member"
                            ? "Promote to admin"
                            : u.role === "admin"
                            ? "Demote to member"
                            : ""
                        }
                      >
                        {processingId === u.id
                          ? "Working…"
                          : u.role === "member"
                          ? "Promote → admin"
                          : u.role === "admin"
                          ? "Demote → member"
                          : ""}
                      </button>
                    )}

                    <button
                      onClick={() => removeUser(u.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                      disabled={processingId === u.id}
                      title="Delete user"
                    >
                      {processingId === u.id ? "Working…" : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
              {users.length === 0 && (
                <div className="p-3 text-gray-600">No other users yet.</div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
