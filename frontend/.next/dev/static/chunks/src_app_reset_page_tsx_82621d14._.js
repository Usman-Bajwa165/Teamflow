(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/reset/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/app/reset/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ResetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ResetPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "ad02caf22e1b14742cbf40b86a3c01e3258e48f4d458738ab8d301e1e0a46004") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ad02caf22e1b14742cbf40b86a3c01e3258e48f4d458738ab8d301e1e0a46004";
    }
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    if ($[1] !== password || $[2] !== token) {
        t0 = async function submit(e) {
            e.preventDefault();
            setMsg(null);
            if (password.length < 7) {
                setMsg("Password must be at least 7 characters.");
                return;
            }
            ;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPassword"])(token, password);
                setMsg("Password reset successful. Please login.");
            } catch (t1) {
                const err = t1;
                setMsg(err?.body?.message || "Reset failed");
            }
        };
        $[1] = password;
        $[2] = token;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    const submit = t0;
    let t1;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl mb-4",
            children: "Reset password"
        }, void 0, false, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== msg) {
        t2 = msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-3",
            children: msg
        }, void 0, false, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 52,
            columnNumber: 17
        }, this);
        $[5] = msg;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "ResetPage[<input>.onChange]": (e_0)=>setToken(e_0.target.value)
        })["ResetPage[<input>.onChange]"];
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== token) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            value: token,
            onChange: t3,
            placeholder: "Reset token (from server console)",
            className: "w-full px-3 py-2 border rounded"
        }, void 0, false, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[8] = token;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "ResetPage[<input>.onChange]": (e_1)=>setPassword(e_1.target.value)
        })["ResetPage[<input>.onChange]"];
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== password) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            value: password,
            onChange: t5,
            placeholder: "New password",
            type: "password",
            className: "w-full px-3 py-2 border rounded"
        }, void 0, false, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[11] = password;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "bg-blue-600 text-white px-4 py-2 rounded",
            children: "Reset"
        }, void 0, false, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== submit || $[15] !== t4 || $[16] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: submit,
            className: "space-y-3",
            children: [
                t4,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[14] = submit;
        $[15] = t4;
        $[16] = t6;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== t2 || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-md mx-auto mt-8",
            children: [
                t1,
                t2,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/reset/page.tsx",
            lineNumber: 111,
            columnNumber: 10
        }, this);
        $[18] = t2;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    return t9;
}
_s(ResetPage, "9MBOQA6v3SSG7+30dzlFhpG0T5E=");
_c = ResetPage;
var _c;
__turbopack_context__.k.register(_c, "ResetPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_reset_page_tsx_82621d14._.js.map