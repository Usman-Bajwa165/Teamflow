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
    // local state
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // invite state
    const [inviteEmail, setInviteEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [inviteRole, setInviteRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("member");
    const [usersList, setUsersList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedUserId, setSelectedUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [processingMemberId, setProcessingMemberId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // delete-confirm UI state
    const [showDeleteConfirm, setShowDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteNameInput, setDeleteNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!teamId) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Invalid team id"
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
        lineNumber: 60,
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
    // 1) load team (always)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamPage.useEffect": ()=>{
            let mounted = true;
            ({
                "TeamPage.useEffect": async ()=>{
                    setMsg(null);
                    setLoading(true);
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeamDetails"])(String(teamId));
                        if (!mounted) return;
                        setTeam(data);
                    } catch (err) {
                        const e = err;
                        setMsg(e?.body?.message || e.message || "Failed to load team");
                    } finally{
                        if (mounted) setLoading(false);
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
        teamId
    ]);
    // 2) load users list ONLY if the signed-in user is a global admin.
    // This avoids hitting /admin/users (404) for non-admin users.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamPage.useEffect": ()=>{
            let mounted_0 = true;
            ({
                "TeamPage.useEffect": async ()=>{
                    setUsersList(null);
                    if (!user?.role || user.role !== "admin") return;
                    try {
                        const res = await fetch(`${API_BASE}/admin/users`, {
                            headers: authHeaders()
                        });
                        if (!mounted_0) return;
                        if (!res.ok) {
                            // don't print to console — fail silently (admins can still manually invite)
                            setUsersList(null);
                            return;
                        }
                        const json = await res.json();
                        // Expecting an array; if server returns wrapper, try to extract.
                        let arr = [];
                        if (Array.isArray(json)) arr = json;
                        else if (Array.isArray(json.users)) arr = json.users;
                        else if (Array.isArray(json.data)) arr = json.data;
                        else arr = json; // best-effort
                        if (mounted_0) setUsersList(arr);
                    } catch  {
                        if (mounted_0) setUsersList(null);
                    }
                }
            })["TeamPage.useEffect"]();
            return ({
                "TeamPage.useEffect": ()=>{
                    mounted_0 = false;
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
    const ownerName = team?.members?.find((m_1)=>m_1.role === "owner")?.user?.name ?? team?.members?.find((m_0)=>m_0.role === "owner")?.user?.email ?? team?.ownerId ?? "—";
    async function reloadTeam() {
        setMsg(null);
        setLoading(true);
        try {
            const data_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeamDetails"])(String(teamId));
            setTeam(data_0);
        } catch (err_0) {
            const e_0 = err_0;
            setMsg(e_0?.body?.message || e_0.message || "Failed to reload team");
        } finally{
            setLoading(false);
        }
    }
    async function handleInvite(e_1) {
        e_1?.preventDefault();
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
            await reloadTeam();
            setMsg("Invitation/added successfully.");
        } catch (err_1) {
            setMsg(err_1.message || "Network error");
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
            const r_0 = await fetch(`${API_BASE}/teams/${teamId}/members/${memberId}/role`, {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({
                    role: newRole
                })
            });
            if (!r_0.ok) {
                const txt_0 = await r_0.text().catch(()=>"");
                throw new Error(txt_0 || `Failed (${r_0.status})`);
            }
            await reloadTeam();
            setMsg("Role updated.");
        } catch (err_2) {
            setMsg(err_2.message || "Failed to update role");
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
    async function removeMember(memberId_0) {
        if (!canManage) {
            setMsg("Not permitted");
            return;
        }
        if (!confirm("Remove this member from the team?")) return;
        setProcessingMemberId(memberId_0);
        try {
            const r_1 = await fetch(`${API_BASE}/teams/${teamId}/members/${memberId_0}`, {
                method: "DELETE",
                headers: authHeaders()
            });
            if (!r_1.ok) {
                const txt_1 = await r_1.text().catch(()=>"");
                throw new Error(txt_1 || `Failed (${r_1.status})`);
            }
            await reloadTeam();
            setMsg("Member removed.");
        } catch (err_3) {
            setMsg(err_3.message || "Failed to remove");
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
            const r_2 = await fetch(`${API_BASE}/teams/${teamId}`, {
                method: "DELETE",
                headers: authHeaders()
            });
            if (!r_2.ok) {
                const txt_2 = await r_2.text().catch(()=>"");
                throw new Error(txt_2 || `Delete failed (${r_2.status})`);
            }
            router.push("/teams");
        } catch (err_4) {
            setMsg(err_4.message || "Failed to delete team");
        } finally{
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    }
    function userIsInOtherTeam(u_0) {
        // best-effort detection: when backend returned _count or teamIds
        const count = typeof u_0._count?.teamMembers === "number" ? u_0._count.teamMembers : undefined;
        const teamIds = Array.isArray(u_0.teamIds) ? u_0.teamIds : undefined;
        const alreadyInThis = team?.members?.some((m_2)=>m_2.user?.id === u_0.id);
        if (typeof count === "number") {
            return count > 0 && !alreadyInThis;
        }
        if (Array.isArray(teamIds)) {
            return teamIds.length > 0 && !alreadyInThis;
        }
        return false;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/teams",
                    className: "text-sm text-blue-600",
                    children: "← Back to teams"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Loading team..."
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                lineNumber: 320,
                columnNumber: 19
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 text-red-600",
                children: msg
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                lineNumber: 321,
                columnNumber: 15
            }, this),
            !loading && team && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold mb-1",
                                children: team.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Owner:"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    ownerName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Members:"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    team.members?.length ?? 0
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    canManage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 p-3 border rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-2",
                                children: "Add / invite member"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 335,
                                columnNumber: 15
                            }, this),
                            usersList ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedUserId ?? "",
                                        onChange: (e_2)=>setSelectedUserId(e_2.target.value || null),
                                        className: "px-3 py-2 border rounded",
                                        style: {
                                            minWidth: 300
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Select a user (or leave blank to enter email) --"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 21
                                            }, this),
                                            usersList.filter((u_1)=>u_1.id !== myUserId).map((u_2)=>{
                                                const inOther = userIsInOtherTeam(u_2);
                                                const disabled = team.members?.some((m_3)=>m_3.user?.id === u_2.id);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: u_2.id,
                                                    disabled: disabled,
                                                    style: {
                                                        backgroundColor: disabled ? "#f0f0f0" : inOther ? "#ffecec" : undefined,
                                                        color: inOther ? "#900" : undefined
                                                    },
                                                    children: [
                                                        u_2.name ? `${u_2.name} — ${u_2.email}` : u_2.email,
                                                        disabled ? " (already in this team)" : inOther ? " (in other team)" : ""
                                                    ]
                                                }, u_2.id, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 22
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: inviteEmail,
                                        onChange: (e_3)=>setInviteEmail(e_3.target.value),
                                        placeholder: "Or enter email manually",
                                        className: "px-3 py-2 border rounded flex-1"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 357,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: inviteRole,
                                        onChange: (e_4)=>setInviteRole(e_4.target.value),
                                        className: "px-2 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "member",
                                                children: "Member"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "admin",
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "owner",
                                                children: "Owner"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-green-600 text-white px-3 py-2 rounded",
                                        onClick: (e_5)=>handleInvite(e_5),
                                        disabled: !!processingMemberId && processingMemberId !== "invite",
                                        children: processingMemberId === "invite" ? "Working…" : "Add / Invite"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 337,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleInvite,
                                className: "flex gap-2 flex-wrap items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: inviteEmail,
                                        onChange: (e_6)=>setInviteEmail(e_6.target.value),
                                        placeholder: "Email to invite",
                                        className: "px-3 py-2 border rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: inviteRole,
                                        onChange: (e_7)=>setInviteRole(e_7.target.value),
                                        className: "px-2 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "member",
                                                children: "Member"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "admin",
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "owner",
                                                children: "Owner"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "bg-green-600 text-white px-3 py-2 rounded",
                                        children: "Invite"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 368,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 334,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg mb-2",
                        children: "Members"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2 mb-4",
                        children: [
                            team.members?.map((m_4)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "p-3 border rounded flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: [
                                                        m_4.user?.name ?? m_4.user?.email,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm text-gray-600",
                                                            children: [
                                                                "(",
                                                                m_4.user?.email,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                            lineNumber: 387,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: [
                                                        "Role: ",
                                                        m_4.role
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 384,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: canManage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "px-2 py-1 border rounded text-sm",
                                                        onClick: ()=>{
                                                            const next_0 = m_4.role === "member" ? "admin" : m_4.role === "admin" ? "owner" : null;
                                                            if (!next_0) return;
                                                            changeMemberRole(m_4.id, next_0);
                                                        },
                                                        disabled: !!processingMemberId,
                                                        children: processingMemberId === m_4.id ? "Working…" : m_4.role === "member" ? "Promote" : m_4.role === "admin" ? "Make owner" : "Promote"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 23
                                                    }, this),
                                                    m_4.role !== "member" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "px-2 py-1 border rounded text-sm",
                                                        onClick: ()=>demoteMember(m_4),
                                                        disabled: !!processingMemberId,
                                                        children: processingMemberId === m_4.id ? "Working…" : "Demote"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "px-2 py-1 bg-red-600 text-white rounded text-sm",
                                                        onClick: ()=>{
                                                            if (m_4.user.id === myUserId) {
                                                                alert("You cannot remove yourself.");
                                                                return;
                                                            }
                                                            removeMember(m_4.id);
                                                        },
                                                        disabled: !!processingMemberId || m_4.user.id === myUserId,
                                                        children: processingMemberId === m_4.id ? "Working…" : "Remove"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500",
                                                children: "View only"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, m_4.id, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 39
                                }, this)),
                            (!team.members || team.members.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "No members yet"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 420,
                                columnNumber: 62
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg mb-2",
                        children: "Projects assigned"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 423,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: [
                            (team.projects || []).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "p-2 border rounded mb-2 flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: p.description
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/projects/${p.id}`,
                                                className: "text-blue-600",
                                                children: "Open"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                                lineNumber: 431,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 425,
                                    columnNumber: 45
                                }, this)),
                            (team.projects || []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "No projects assigned"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                lineNumber: 436,
                                columnNumber: 52
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this),
                    (user?.role === "admin" || myRoleInTeam === "owner") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: !showDeleteConfirm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-red-700 text-white px-3 py-2 rounded",
                            onClick: openDeleteForm,
                            disabled: deleting || processingMemberId === "delete-team",
                            children: "Delete team"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                            lineNumber: 440,
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
                                        lineNumber: 444,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 443,
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
                                            lineNumber: 448,
                                            columnNumber: 21
                                        }, this),
                                        " and",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "will also delete projects assigned to this team"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 21
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: deleteNameInput,
                                    onChange: (e_8)=>setDeleteNameInput(e_8.target.value),
                                    placeholder: "Type exact team name",
                                    className: "px-3 py-2 border rounded w-full mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 455,
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
                                            lineNumber: 458,
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
                                            lineNumber: 461,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                            lineNumber: 442,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
                        lineNumber: 439,
                        columnNumber: 68
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/teams/[id]/page.tsx",
        lineNumber: 313,
        columnNumber: 10
    }, this);
}
_s(TeamPage, "fSbvR2vzP21Q8vY4ZgQGOMM3SyE=", false, function() {
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