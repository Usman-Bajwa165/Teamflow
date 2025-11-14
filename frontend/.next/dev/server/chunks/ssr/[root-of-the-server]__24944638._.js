module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/src/lib/api.ts
__turbopack_context__.s([
    "createColumn",
    ()=>createColumn,
    "createProject",
    ()=>createProject,
    "createTask",
    ()=>createTask,
    "createTeam",
    ()=>createTeam,
    "deleteTask",
    ()=>deleteTask,
    "getMyTeams",
    ()=>getMyTeams,
    "getProject",
    ()=>getProject,
    "getTeamMembers",
    ()=>getTeamMembers,
    "inviteToTeam",
    ()=>inviteToTeam,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "moveTask",
    ()=>moveTask,
    "refresh",
    ()=>refresh,
    "register",
    ()=>register,
    "requestPasswordReset",
    ()=>requestPasswordReset,
    "resetPassword",
    ()=>resetPassword,
    "updateTask",
    ()=>updateTask
]);
const BASE = ("TURBOPACK compile-time value", "http://localhost:4000") || "http://localhost:4000";
function getAuthHeader() {
    const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {};
}
async function request(path, opts = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...opts.headers || {}
        },
        credentials: "omit",
        ...opts
    });
    const text = await res.text();
    try {
        const json = text ? JSON.parse(text) : null;
        if (!res.ok) throw {
            status: res.status,
            body: json || text
        };
        return json;
    } catch (e) {
        if (!res.ok) throw {
            status: res.status,
            body: text
        };
        return null;
    }
}
async function register(body) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(body)
    });
}
async function login(body) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(body)
    });
}
async function logout() {
    const h = getAuthHeader();
    return request("/auth/logout", {
        method: "POST",
        headers: h
    });
}
async function refresh(refreshToken) {
    return request("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({
            refreshToken
        })
    });
}
async function requestPasswordReset(email) {
    return request("/auth/request-password-reset", {
        method: "POST",
        body: JSON.stringify({
            email
        })
    });
}
async function resetPassword(token, newPassword) {
    return request("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
            token,
            newPassword
        })
    });
}
async function createTeam(name) {
    return request("/teams", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            name
        })
    });
}
async function getMyTeams() {
    return request("/teams/my", {
        headers: getAuthHeader()
    });
}
async function inviteToTeam(teamId, email, role = "member") {
    return request(`/teams/${teamId}/invite`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            email,
            role
        })
    });
}
async function getTeamMembers(teamId) {
    return request(`/teams/${teamId}/members`, {
        headers: getAuthHeader()
    });
}
async function createProject(name, description) {
    return request("/projects", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            name,
            description
        })
    });
}
async function getProject(projectId) {
    return request(`/projects/${projectId}`, {
        headers: getAuthHeader()
    });
}
async function createColumn(projectId, title) {
    return request(`/projects/${projectId}/columns`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            title
        })
    });
}
async function createTask(columnId, title, description) {
    return request(`/projects/columns/${columnId}/tasks`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
            title,
            description
        })
    });
}
async function moveTask(taskId, targetColumnId, targetPosition) {
    return request(`/projects/tasks/${taskId}/move`, {
        method: "PATCH",
        headers: getAuthHeader(),
        body: JSON.stringify({
            targetColumnId,
            targetPosition
        })
    });
}
async function updateTask(taskId, data) {
    return request(`/projects/tasks/${taskId}`, {
        method: "PATCH",
        headers: getAuthHeader(),
        body: JSON.stringify(data)
    });
}
async function deleteTask(taskId) {
    return request(`/projects/tasks/${taskId}`, {
        method: "DELETE",
        headers: getAuthHeader()
    });
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// frontend/src/context/AuthContext.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refreshToken, setRefreshToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const a = localStorage.getItem("tf_access");
        const r = localStorage.getItem("tf_refresh");
        const u = localStorage.getItem("tf_user");
        if (a) setAccessToken(a);
        if (r) setRefreshToken(r);
        if (u) setUser(JSON.parse(u));
    }, []);
    const saveTokens = (tokens)=>{
        localStorage.setItem("tf_access", tokens.accessToken);
        localStorage.setItem("tf_refresh", tokens.refreshToken);
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
    };
    const login = async (email, password)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"]({
            email,
            password
        });
        saveTokens(res.tokens);
        setUser(res.user);
        localStorage.setItem("tf_user", JSON.stringify(res.user));
        router.push("/teams");
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"]();
        } catch  {}
        localStorage.removeItem("tf_access");
        localStorage.removeItem("tf_refresh");
        localStorage.removeItem("tf_user");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        router.push("/login");
    };
    const register = async (email, password, name)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"]({
            email,
            password,
            name
        });
        // after register, redirect to login
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            accessToken,
            refreshToken,
            login,
            logout,
            register
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function useAuth() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__24944638._.js.map