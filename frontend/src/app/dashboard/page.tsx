'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  listProjects,
  getMyTeams,
  getAllTeams,
  getAllUsers,
} from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

type Project = any;
type Team = any;
type User = any;

function niceDate(d?: string | null) {
  if (!d) return '—';
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString();
  } catch {
    return d;
  }
}

function timeLeftText(d?: string | null) {
  if (!d) return 'No due date';
  const now = Date.now();
  const due = new Date(d).getTime();
  const diff = due - now;
  if (diff <= 0) return 'Past due';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h left`;
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${mins}m left`;
  return `${mins}m left`;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const p = await listProjects(); // returns projects with columns/tasks
        if (!mounted) return;
        setProjects(Array.isArray(p) ? p : []);

        // teams: admin -> all, otherwise only my teams
        if (user?.role === 'admin') {
          try {
            const t = await getAllTeams();
            if (mounted) setTeams(Array.isArray(t) ? t : []);
          } catch {
            const t2 = await getMyTeams();
            if (mounted) setTeams(Array.isArray(t2) ? t2 : []);
          }
        } else {
          const t = await getMyTeams();
          if (mounted) setTeams(Array.isArray(t) ? t : []);
        }

        // users: only for admin (graceful fallback)
        if (user?.role === 'admin') {
          try {
            const u = await getAllUsers();
            if (mounted) setUsers(Array.isArray(u) ? u : []);
          } catch {
            if (mounted) setUsers([]);
          }
        } else {
          if (mounted) setUsers([]);
        }
      } catch (e: any) {
        if (mounted) setErr('Failed to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  // derived metrics
  const totals = useMemo(() => {
    const totalProjects = projects.length;
    let totalTasks = 0;
    const statusCounts: Record<string, number> = { TODO: 0, IN_PROGRESS: 0, FINISHED: 0 };
    for (const p of projects) {
      const cols = p.columns ?? [];
      for (const c of cols) {
        const tasks = c.tasks ?? [];
        totalTasks += tasks.length;
        for (const t of tasks) {
          const s = (t.status ?? 'TODO').toString();
          statusCounts[s] = (statusCounts[s] || 0) + 1;
        }
      }
    }
    const totalTeams = teams.length;
    const totalUsers = users.length;

    // upcoming due projects sorted soonest first
    const withDue = projects
      .map((pr) => ({
        ...pr,
        dueAt: pr.dueDate ? new Date(pr.dueDate).getTime() : null,
      }))
      .filter((pr) => pr.dueAt)
      .sort((a, b) => (a.dueAt! - b.dueAt!));

    // projects per team
    const perTeam: Record<string, Project[]> = {};
    for (const pr of projects) {
      const t = pr.team?.id ?? pr.teamId ?? 'Unassigned';
      perTeam[t] = perTeam[t] || [];
      perTeam[t].push(pr);
    }

    return {
      totalProjects,
      totalTasks,
      statusCounts,
      totalTeams,
      totalUsers,
      upcoming: withDue,
      perTeam,
    };
  }, [projects, teams, users]);

  // visual helpers
  function pct(part: number, total: number) {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  }

  // redirect guard: if not logged in, send to login
  useEffect(() => {
    if (user === undefined || user === null) {
      // don't redirect immediately while loading auth; only if definitely not logged in
      // we assume AuthContext provides null when logged out
      // If your AuthContext sets user=null initially then adapt this logic.
      // Here we only redirect if explicitly null and not loading.
      // For safety, do nothing if user is undefined.
      if (user === null) router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of activity and health across teams & projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/projects')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.01] transition"
          >
            View Projects
          </button>
        </div>
      </div>

      {err && <div className="mb-4 text-red-600">{err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card: Users */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Total users</div>
              <div className="text-2xl font-semibold mt-1 text-slate-800">{loading ? '—' : totals.totalUsers}</div>
            </div>
            <div className="p-2 bg-indigo-50 rounded-full">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21v-2c0-2.761-3.134-5-7-5H10c-3.866 0-7 2.239-7 5v2" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">All active users.</div>
        </div>

        {/* Card: Teams */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Teams</div>
              <div className="text-2xl font-semibold mt-1 text-slate-800">{loading ? '—' : totals.totalTeams}</div>
            </div>
            <div className="p-2 bg-emerald-50 rounded-full">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5z" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 22v-2c0-2.761 3.134-5 7-5h6c3.866 0 7 2.239 7 5v2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">Number of teams you can access.</div>
        </div>

        {/* Card: Projects */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Projects</div>
              <div className="text-2xl font-semibold mt-1 text-slate-800">{loading ? '—' : totals.totalProjects}</div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-full">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#D97706" strokeWidth="1.5"/><path d="M8 7h8" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">Active projects in your scope.</div>
        </div>

        {/* Card: Tasks */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Tasks</div>
              <div className="text-2xl font-semibold mt-1 text-slate-800">{loading ? '—' : totals.totalTasks}</div>
            </div>
            <div className="p-2 bg-rose-50 rounded-full">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M10 17h10" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">All tasks across visible projects.</div>
        </div>
      </div>

      {/* Status breakdown + upcoming due + per-team projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Task status</h3>
          <div className="space-y-3">
            {(['TODO', 'IN_PROGRESS', 'FINISHED'] as const).map((k) => {
              const val = totals.statusCounts[k] || 0;
              const percent = pct(val, totals.totalTasks);
              return (
                <div key={k}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">{k.replace('_', ' ')}</div>
                    <div className="text-slate-500">{val}</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-2 ${k === 'FINISHED' ? 'bg-emerald-500' : k === 'IN_PROGRESS' ? 'bg-indigo-500' : 'bg-amber-400'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Upcoming due</h3>
          <div className="space-y-3">
            {totals.upcoming.length === 0 && <div className="text-sm text-slate-500">No upcoming due dates</div>}
            {totals.upcoming.slice(0, 6).map((pr: Project) => {
              // compute progress from assignedAt -> dueDate
              let percent = 0;
              if (pr.assignedAt && pr.dueDate) {
                const from = new Date(pr.assignedAt).getTime();
                const to = new Date(pr.dueDate).getTime();
                const now = Date.now();
                if (to > from) {
                  percent = Math.min(100, Math.max(0, Math.round(((now - from) / (to - from)) * 100)));
                }
              }
              return (
                <div key={pr.id} className="border rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{pr.name}</div>
                      <div className="text-xs text-slate-500">{pr.team?.name ?? 'Unassigned'}</div>
                    </div>
                    <div className="text-sm text-slate-600">{timeLeftText(pr.dueDate)}</div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div style={{ width: `${percent}%` }} className="h-2 bg-indigo-400" />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Due: {niceDate(pr.dueDate)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Projects by team</h3>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
            {Object.keys(totals.perTeam).length === 0 && <div className="text-sm text-slate-500">No projects</div>}
            {Object.entries(totals.perTeam).map(([teamId, list]) => {
              const teamName = teams.find((t) => (t.id ?? t.team?.id) === teamId)?.name ?? (teamId === 'Unassigned' ? 'Unassigned' : teamId);
              return (
                <div key={teamId} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <div>
                    <div className="text-sm font-medium">{teamName}</div>
                    <div className="text-xs text-slate-500">{list.length} projects</div>
                  </div>
                  <div className="text-sm text-slate-600">{list.slice(0, 2).map(p => p.name).join(', ')}{list.length > 2 ? ` +${list.length - 2}` : ''}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* recent projects table */}
      <div className="mt-8 bg-white p-5 rounded-2xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent projects</h3>
          <div className="text-sm text-slate-500">{totals.totalProjects} projects</div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="py-8 text-center text-slate-500">No projects available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 border-b">
                  <th className="py-2">Project</th>
                  <th className="py-2">Team</th>
                  <th className="py-2">Tasks</th>
                  <th className="py-2">Due</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 12).map((pr) => {
                  const taskCount = (pr.columns ?? []).reduce((acc: number, c: any) => acc + ((c.tasks ?? []).length || 0), 0);
                  const finished = (pr.columns ?? []).reduce((acc: number, c: any) => acc + ((c.tasks ?? []).filter((t: any) => t.status === 'FINISHED').length || 0), 0);
                  const statusLabel = finished === taskCount && taskCount > 0 ? 'Completed' : (pr.dueDate && new Date(pr.dueDate).getTime() < Date.now() ? 'Overdue' : 'Active');
                  return (
                    <tr key={pr.id} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="font-medium">{pr.name}</div>
                        <div className="text-xs text-slate-500">{pr.description ?? '—'}</div>
                      </td>
                      <td className="py-3">{pr.team?.name ?? 'Unassigned'}</td>
                      <td className="py-3">{taskCount}</td>
                      <td className="py-3">{pr.dueDate ? niceDate(pr.dueDate) : '—'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${statusLabel === 'Completed' ? 'bg-emerald-100 text-emerald-800' : statusLabel === 'Overdue' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'}`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
