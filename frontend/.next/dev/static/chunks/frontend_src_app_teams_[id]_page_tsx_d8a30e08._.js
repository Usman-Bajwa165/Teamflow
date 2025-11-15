(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/teams/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// frontend/src/app/teams/[id]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:4000") ?? "http://localhost:4000";
function TeamPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const teamId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inviteEmail, setInviteEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [inviteRole, setInviteRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("member");
    const [usersList, setUsersList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedUserId, setSelectedUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [processingMemberId, setProcessingMemberId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteNameInput, setDeleteNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    if (!teamId) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Invalid team id"
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
        lineNumber: 56,
        columnNumber: 23
    }, this);
    function authHeaders() {
        const t = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("tf_access") : "TURBOPACK unreachable";
        return {
            "Content-Type": "application/json",
            ...t ? {
                Authorization: `Bearer ${t}`
            } : {}
        };
    }
    async function loadTeam() {
        setMsg(null);
        setLoading(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeamDetails"])(String(teamId));
            setTeam(data);
            const projs = data?.projects;
            if (Array.isArray(projs) && projs.length > 0) {
                try {
                    const detailed = await Promise.all(projs.map(async (p)=>{
                        if (!p?.id) return p;
                        try {
                            const full = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProject"])(p.id);
                            return full;
                        } catch  {
                            return p;
                        }
                    }));
                    setTeam((prev)=>({
                            ...prev || {},
                            projects: detailed
                        }));
                } catch  {
                // ignore
                }
            }
        } catch (err) {
            const e = err;
            setMsg(e?.body?.message || e.message || "Failed to load team");
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamPage.useEffect": ()=>{
            loadTeam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TeamPage.useEffect"], [
        teamId
    ]);
    // admin users list (only if global admin)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamPage.useEffect": ()=>{
            let mounted = true;
            ({
                "TeamPage.useEffect": async ()=>{
                    setUsersList(null);
                    if (!user?.role || user.role !== "admin") return;
                    try {
                        const res = await fetch(`${API_BASE}/admin/users`, {
                            headers: authHeaders()
                        });
                        if (!mounted) return;
                        if (!res.ok) {
                            setUsersList(null);
                            return;
                        }
                        const json = await res.json();
                        let arr = [];
                        if (Array.isArray(json)) arr = json;
                        else if (Array.isArray(json.users)) arr = json.users;
                        else if (Array.isArray(json.data)) arr = json.data;
                        else arr = json;
                        if (mounted) setUsersList(arr);
                    } catch  {
                        if (mounted) setUsersList(null);
                    }
                }
            })["TeamPage.useEffect"]();
            return ({
                "TeamPage.useEffect": ()=>{
                    mounted = false;
                }
            })["TeamPage.useEffect"];
        }
    }["TeamPage.useEffect"], [
        user?.role
    ]);
    const myUserId = user?.id ?? null;
    const myMembership = team?.members?.find((m)=>m.user?.id === myUserId);
    const myRoleInTeam = myMembership?.role ?? null;
    const canManage = user?.role === "admin" || myRoleInTeam === "owner" || myRoleInTeam === "admin";
    const ownerName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeamPage.useMemo[ownerName]": ()=>{
            const owner = team?.members?.find({
                "TeamPage.useMemo[ownerName]": (m)=>m.role === "owner"
            }["TeamPage.useMemo[ownerName]"]);
            return owner?.user?.name ?? owner?.user?.email ?? team?.ownerId ?? "—";
        }
    }["TeamPage.useMemo[ownerName]"], [
        team
    ]);
    // collect all tasks across team's projects
    const allProjectTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeamPage.useMemo[allProjectTasks]": ()=>{
            const tasks = [];
            (team?.projects || []).forEach({
                "TeamPage.useMemo[allProjectTasks]": (p)=>{
                    if (Array.isArray(p.tasks) && p.tasks.length) tasks.push(...p.tasks.map({
                        "TeamPage.useMemo[allProjectTasks]": (t)=>({
                                ...t,
                                projectId: p.id,
                                projectName: p.name
                            })
                    }["TeamPage.useMemo[allProjectTasks]"]));
                    else if (Array.isArray(p.columns)) {
                        p.columns.forEach({
                            "TeamPage.useMemo[allProjectTasks]": (c)=>{
                                if (Array.isArray(c.tasks)) tasks.push(...c.tasks.map({
                                    "TeamPage.useMemo[allProjectTasks]": (t)=>({
                                            ...t,
                                            projectId: p.id,
                                            projectName: p.name
                                        })
                                }["TeamPage.useMemo[allProjectTasks]"]));
                            }
                        }["TeamPage.useMemo[allProjectTasks]"]);
                    }
                }
            }["TeamPage.useMemo[allProjectTasks]"]);
            return tasks;
        }
    }["TeamPage.useMemo[allProjectTasks]"], [
        team
    ]);
    // map userId => tasks array
    const memberTaskMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeamPage.useMemo[memberTaskMap]": ()=>{
            const map = new Map();
            (team?.members || []).forEach({
                "TeamPage.useMemo[memberTaskMap]": (m)=>map.set(m.user.id, [])
            }["TeamPage.useMemo[memberTaskMap]"]);
            allProjectTasks.forEach({
                "TeamPage.useMemo[memberTaskMap]": (t)=>{
                    const aId = t.assigneeId ?? t.assignee?.id;
                    if (aId && map.has(aId)) {
                        map.get(aId).push(t);
                    }
                }
            }["TeamPage.useMemo[memberTaskMap]"]);
            return map;
        }
    }["TeamPage.useMemo[memberTaskMap]"], [
        team,
        allProjectTasks
    ]);
    const totalMembers = team?.members?.length ?? 0;
    const totalProjects = team?.projects?.length ?? 0;
    const totalTasks = allProjectTasks.length;
    const availableMembers = team?.members?.filter((m)=>(memberTaskMap.get(m.user.id) || []).length === 0).length ?? 0;
    async function handleInvite(e) {
        e?.preventDefault();
        setMsg(null);
        if (!canManage) {
            setMsg("Not permitted");
            return;
        }
        setProcessingMemberId("invite");
        try {
            let body;
            if (selectedUserId && usersList) {
                const u = usersList.find((x)=>x.id === selectedUserId);
                if (!u) throw new Error("Selected user not found");
                body = {
                    email: u.email,
                    role: inviteRole
                };
            } else {
                if (!inviteEmail) {
                    setMsg("Enter email or select a user");
                    setProcessingMemberId(null);
                    return;
                }
                body = {
                    email: inviteEmail,
                    role: inviteRole
                };
            }
            const r = await fetch(`${API_BASE}/teams/${teamId}/invite`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify(body)
            });
            if (!r.ok) {
                const txt = await r.text().catch(()=>"");
                const parsed = (()=>{
                    try {
                        return JSON.parse(txt);
                    } catch  {
                        return null;
                    }
                })();
                const message = parsed?.message || parsed?.error || txt || `Invite failed (${r.status})`;
                setMsg(message);
                setProcessingMemberId(null);
                return;
            }
            setInviteEmail("");
            setSelectedUserId(null);
            setInviteRole("member");
            await loadTeam();
            setMsg("Invitation/added successfully.");
        } catch (err) {
            setMsg(err.message || "Network error");
        } finally{
            setProcessingMemberId(null);
        }
    }
    async function changeMemberRole(memberId, newRole) {
        if (!canManage) {
            setMsg("Not permitted");
            return;
        }
        setProcessingMemberId(memberId);
        try {
            const r = await fetch(`${API_BASE}/teams/${teamId}/members/${memberId}/role`, {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({
                    role: newRole
                })
            });
            if (!r.ok) {
                const txt = await r.text().catch(()=>"");
                throw new Error(txt || `Failed (${r.status})`);
            }
            await loadTeam();
            setMsg("Role updated.");
        } catch (err) {
            setMsg(err.message || "Failed to update role");
        } finally{
            setProcessingMemberId(null);
        }
    }
    async function demoteMember(member) {
        const mapping = {
            owner: "admin",
            admin: "member",
            member: null
        };
        const next = mapping[member.role] ?? "member";
        if (!next) {
            setMsg("Cannot demote further");
            return;
        }
        await changeMemberRole(member.id, next);
    }
    async function removeMember(memberId) {
        if (!canManage) {
            setMsg("Not permitted");
            return;
        }
        if (!confirm("Remove this member from the team?")) return;
        setProcessingMemberId(memberId);
        try {
            const r = await fetch(`${API_BASE}/teams/${teamId}/members/${memberId}`, {
                method: "DELETE",
                headers: authHeaders()
            });
            if (!r.ok) {
                const txt = await r.text().catch(()=>"");
                throw new Error(txt || `Failed (${r.status})`);
            }
            await loadTeam();
            setMsg("Member removed.");
        } catch (err) {
            setMsg(err.message || "Failed to remove");
        } finally{
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
                headers: authHeaders()
            });
            if (!r.ok) {
                const txt = await r.text().catch(()=>"");
                throw new Error(txt || `Delete failed (${r.status})`);
            }
            router.push("/teams");
        } catch (err) {
            setMsg(err.message || "Failed to delete team");
        } finally{
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    }
    function userIsInOtherTeam(u) {
        const count = typeof u._count?.teamMembers === "number" ? u._count.teamMembers : undefined;
        const teamIds = Array.isArray(u.teamIds) ? u.teamIds : undefined;
        const alreadyInThis = team?.members?.some((m)=>m.user?.id === u.id);
        if (typeof count === "number") return count > 0 && !alreadyInThis;
        if (Array.isArray(teamIds)) return teamIds.length > 0 && !alreadyInThis;
        return false;
    }
    function computeProgressForTasks(tasks) {
        if (!tasks || tasks.length === 0) return {
            percent: 0,
            total: 0,
            done: 0
        };
        const total = tasks.length;
        const done = tasks.filter((t)=>String(t.status || "").toUpperCase() === "FINISHED").length;
        const percent = Math.round(done / total * 100);
        return {
            percent,
            total,
            done
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-600",
                children: "Loading team..."
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                lineNumber: 357,
                columnNumber: 19
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-red-600",
                children: msg
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                lineNumber: 358,
                columnNumber: 15
            }, this),
            !loading && team && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold",
                                        children: team.name
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600 mt-1",
                                        children: [
                                            "Owner: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: ownerName
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-3 rounded text-center min-w-[110px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: "Members"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: totalMembers
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-3 rounded text-center min-w-[110px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: "Projects"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: totalProjects
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-3 rounded text-center min-w-[140px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: "Tasks (team)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-semibold",
                                                children: totalTasks
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400 mt-1",
                                                children: [
                                                    "Available: ",
                                                    String(availableMembers)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 361,
                        columnNumber: 11
                    }, this),
                    canManage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white p-4 rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-3",
                                children: "Add / invite member"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 390,
                                columnNumber: 15
                            }, this),
                            usersList ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedUserId ?? "",
                                        onChange: (e)=>setSelectedUserId(e.target.value || null),
                                        className: "px-3 py-2 border rounded min-w-[280px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Select a user (or leave blank to enter email) --"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 21
                                            }, this),
                                            usersList.filter((u)=>u.id !== myUserId).map((u)=>{
                                                const inOther = userIsInOtherTeam(u);
                                                const disabled = team.members?.some((m)=>m.user?.id === u.id);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: u.id,
                                                    disabled: disabled,
                                                    style: {
                                                        backgroundColor: disabled ? "#f0f0f0" : inOther ? "#fff0f0" : undefined,
                                                        color: inOther ? "#900" : undefined
                                                    },
                                                    children: [
                                                        u.name ? `${u.name} — ${u.email}` : u.email,
                                                        disabled ? " (already in this team)" : inOther ? " (in other team)" : ""
                                                    ]
                                                }, u.id, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 22
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: inviteEmail,
                                        onChange: (e)=>setInviteEmail(e.target.value),
                                        placeholder: "Or enter email manually",
                                        className: "px-3 py-2 border rounded flex-1 min-w-[220px]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: inviteRole,
                                        onChange: (e)=>setInviteRole(e.target.value),
                                        className: "px-2 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "member",
                                                children: "Member"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 413,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "admin",
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "owner",
                                                children: "Owner"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 412,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-green-600 text-white px-3 py-2 rounded",
                                        onClick: (e)=>handleInvite(e),
                                        disabled: !!processingMemberId && processingMemberId !== "invite",
                                        children: processingMemberId === "invite" ? "Working…" : "Add / Invite"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 392,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleInvite,
                                className: "flex gap-2 flex-wrap items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: inviteEmail,
                                        onChange: (e)=>setInviteEmail(e.target.value),
                                        placeholder: "Email to invite",
                                        className: "px-3 py-2 border rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: inviteRole,
                                        onChange: (e)=>setInviteRole(e.target.value),
                                        className: "px-2 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "member",
                                                children: "Member"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 424,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "admin",
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "owner",
                                                children: "Owner"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "bg-green-600 text-white px-3 py-2 rounded",
                                        children: "Invite"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 428,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 421,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 389,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white p-4 rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-3",
                                children: "Members & workload"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    (team.members || []).map((m)=>{
                                        const tasksForMember = memberTaskMap.get(m.user.id) || [];
                                        const prog = computeProgressForTasks(tasksForMember);
                                        const available = tasksForMember.length === 0;
                                        const showPromote = m.role === "member" || m.role === "admin";
                                        const showDemote = m.role === "owner" || m.role === "admin";
                                        const promoteLabel = m.role === "member" ? "Promote" : m.role === "admin" ? "Make owner" : "Promote";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 border rounded flex flex-col md:flex-row md:items-start md:justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-baseline gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-semibold truncate",
                                                                                children: m.user?.name ?? m.user?.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                lineNumber: 451,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-sm text-gray-500 truncate",
                                                                                children: [
                                                                                    "(",
                                                                                    m.user?.email,
                                                                                    ")"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                lineNumber: 454,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right ml-4 flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: " font-bold mr-2",
                                                                            children: "Role"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                            lineNumber: 461,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-gray-500 truncate mr-10",
                                                                            children: m.role
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 460,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: [
                                                                        "Tasks assigned (",
                                                                        tasksForMember.length,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 472,
                                                                    columnNumber: 25
                                                                }, this),
                                                                tasksForMember.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-500 mt-1",
                                                                    children: "No tasks"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 475,
                                                                    columnNumber: 56
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "mt-2 space-y-1",
                                                                    children: tasksForMember.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "text-sm text-slate-700",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-medium",
                                                                                    children: t.projectName ?? t.projectId
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                    lineNumber: 479,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "mx-2 text-gray-400",
                                                                                    children: "—"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                    lineNumber: 482,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: t.title ?? "Untitled task"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                    lineNumber: 483,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "ml-2 text-xs text-gray-400",
                                                                                    children: [
                                                                                        "(",
                                                                                        String(t.status || "TODO"),
                                                                                        ")"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                                    lineNumber: 484,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, t.id, true, {
                                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                            lineNumber: 478,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 36
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "md:w-56 flex flex-col items-end gap-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: canManage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                showPromote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-2 py-1 border rounded text-sm min-w-24 text-center",
                                                                    onClick: ()=>{
                                                                        const next = m.role === "member" ? "admin" : m.role === "admin" ? "owner" : undefined;
                                                                        if (!next) return;
                                                                        changeMemberRole(m.id, next);
                                                                    },
                                                                    disabled: !!processingMemberId,
                                                                    children: processingMemberId === m.id ? "…" : promoteLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 496,
                                                                    columnNumber: 45
                                                                }, this),
                                                                showDemote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-2 py-1 border rounded text-sm",
                                                                    onClick: ()=>demoteMember(m),
                                                                    disabled: !!processingMemberId,
                                                                    children: processingMemberId === m.id ? "…" : "Demote"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 44
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-2 py-1 bg-red-600 text-white rounded text-sm",
                                                                    onClick: ()=>{
                                                                        if (m.user.id === myUserId) {
                                                                            alert("You cannot remove yourself.");
                                                                            return;
                                                                        }
                                                                        removeMember(m.id);
                                                                    },
                                                                    disabled: !!processingMemberId || m.user.id === myUserId,
                                                                    children: processingMemberId === m.id ? "…" : "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-500",
                                                            children: "View only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 517,
                                                            columnNumber: 33
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, m.id, true, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 20
                                        }, this);
                                    }),
                                    (!team.members || team.members.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500",
                                        children: "No members yet"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 64
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 437,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 435,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white p-4 rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-3",
                                children: "Projects assigned"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 529,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    (team.projects || []).map((p)=>{
                                        let projTasks = [];
                                        if (Array.isArray(p.tasks) && p.tasks.length) projTasks = p.tasks;
                                        else if (Array.isArray(p.columns)) {
                                            p.columns.forEach((c)=>{
                                                if (Array.isArray(c.tasks)) projTasks.push(...c.tasks);
                                            });
                                        }
                                        const summary = computeProgressForTasks(projTasks);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 border rounded flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold",
                                                            children: p.name ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-500",
                                                            children: p.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-500",
                                                            children: [
                                                                "Tasks: ",
                                                                projTasks.length
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 548,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium",
                                                            children: [
                                                                summary.percent,
                                                                "% done"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/projects/${p.id}`,
                                                                className: "text-indigo-600 text-sm",
                                                                children: "Open"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 547,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 20
                                        }, this);
                                    }),
                                    (team.projects || []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500",
                                        children: "No projects assigned"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 563,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 530,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 528,
                        columnNumber: 11
                    }, this),
                    (user?.role === "admin" || myRoleInTeam === "owner") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-4",
                        children: !showDeleteConfirm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-red-700 text-white px-3 py-2 rounded",
                            onClick: openDeleteForm,
                            disabled: deleting || processingMemberId === "delete-team",
                            children: "Delete team"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                            lineNumber: 571,
                            columnNumber: 37
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border rounded bg-yellow-50 max-w-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Type the team name to confirm deletion:"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 575,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 574,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: [
                                        "This will permanently delete the team",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: team.name
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 21
                                        }, this),
                                        " and",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "also delete projects assigned to this team"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 580,
                                            columnNumber: 21
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 577,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: deleteNameInput,
                                    onChange: (e)=>setDeleteNameInput(e.target.value),
                                    placeholder: "Type exact team name",
                                    className: "px-3 py-2 border rounded w-full mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 583,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg-red-700 text-white px-3 py-2 rounded",
                                            onClick: ()=>performDeleteTeam(),
                                            disabled: deleting || deleteNameInput !== team.name,
                                            children: deleting ? "Deleting…" : "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 586,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-3 py-2 border rounded",
                                            onClick: ()=>{
                                                setShowDeleteConfirm(false);
                                                setDeleteNameInput("");
                                            },
                                            disabled: deleting,
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 589,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 585,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                            lineNumber: 573,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 570,
                        columnNumber: 68
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
        lineNumber: 356,
        columnNumber: 10
    }, this);
}
_s(TeamPage, "4/hhDeXjg5iY32xDWONMK4gtetk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = TeamPage;
var _c;
__turbopack_context__.k.register(_c, "TeamPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_app_teams_%5Bid%5D_page_tsx_d8a30e08._.js.map