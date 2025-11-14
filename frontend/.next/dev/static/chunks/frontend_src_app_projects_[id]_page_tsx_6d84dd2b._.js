(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/projects/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// frontend/src/app/projects/[id]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../src/components/TaskBoard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ProjectBoard() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const projectId = params.id;
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newColTitle, setNewColTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newTaskTitles, setNewTaskTitles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectBoard.useEffect": ()=>{
            ({
                "ProjectBoard.useEffect": async ()=>{
                    if (!projectId) return;
                    try {
                        const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProject"])(projectId);
                        const normalized = {
                            ...p,
                            columns: (p?.columns || []).map({
                                "ProjectBoard.useEffect": (c)=>({
                                        ...c,
                                        tasks: c?.tasks || []
                                    })
                            }["ProjectBoard.useEffect"])
                        };
                        setProject(normalized);
                    } catch (err) {
                        setMsg("Failed to load project");
                    }
                }
            })["ProjectBoard.useEffect"]();
        }
    }["ProjectBoard.useEffect"], [
        projectId
    ]);
    async function addColumn(e) {
        e.preventDefault();
        setMsg(null);
        const title = (newColTitle || "").trim();
        if (!title) {
            setMsg("Column title required");
            return;
        }
        try {
            const col = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createColumn"])(project.id, title);
            const newCol = {
                ...col,
                tasks: col?.tasks || []
            };
            setProject((prev)=>({
                    ...prev || {},
                    columns: (prev?.columns || []).concat(newCol)
                }));
            setNewColTitle("");
        } catch (err_0) {
            setMsg(err_0?.body?.message || "Failed to create column");
        }
    }
    async function addTask(columnId) {
        setMsg(null);
        const title_0 = (newTaskTitles[columnId] || "").trim();
        if (!title_0) {
            setMsg("Task title required");
            return;
        }
        try {
            const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTask"])(columnId, title_0);
            setProject((prev_0)=>({
                    ...prev_0 || {},
                    columns: (prev_0?.columns || []).map((c_0)=>c_0.id === columnId ? {
                            ...c_0,
                            tasks: [
                                ...c_0.tasks || [],
                                t
                            ]
                        } : c_0)
                }));
            setNewTaskTitles((prev_1)=>({
                    ...prev_1,
                    [columnId]: ""
                }));
        } catch (err_1) {
            setMsg(err_1?.body?.message || "Failed to create task");
        }
    }
    // controlled columns-change callback used by TaskBoard for optimistic updates & rollback
    function handleColumnsChange(cols) {
        setProject((prev_2)=>({
                ...prev_2 || {},
                columns: cols
            }));
    }
    // forwarded API call; TaskBoard manages optimistic UI via handleColumnsChange
    async function handleMove(taskId, targetColumnId, targetPosition) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moveTask"])(taskId, targetColumnId, targetPosition);
    // optional: re-fetch canonical data here if you want to ensure server canonicality:
    // const p = await getProject(projectId); setProject({...normalized p...})
    }
    if (!project) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Loading project..."
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 95,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: project.name
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 text-red-600",
                children: msg
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 98,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: addColumn,
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: newColTitle,
                            onChange: (e_0)=>setNewColTitle(e_0.target.value),
                            placeholder: "New column title",
                            className: "px-3 py-2 border rounded flex-1"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-slate-600 text-white px-3 py-2 rounded",
                            children: "Add column"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskBoard, {
                columns: project.columns,
                onMove: handleMove,
                onColumnsChange: handleColumnsChange,
                onOpenTask: (taskId_0)=>console.log("open task", taskId_0)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 md:grid-cols-3",
                children: (project.columns || []).map((col_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newTaskTitles[col_0.id] || "",
                                onChange: (e_1)=>setNewTaskTitles((prev_3)=>({
                                            ...prev_3,
                                            [col_0.id]: e_1.target.value
                                        })),
                                placeholder: `New task in ${col_0.title}`,
                                className: "w-full px-2 py-1 border rounded mb-2"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>addTask(col_0.id),
                                className: "w-full bg-green-600 text-white py-1 rounded",
                                children: "Add task"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, col_0.id, true, {
                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                        lineNumber: 112,
                        columnNumber: 54
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 96,
        columnNumber: 10
    }, this);
}
_s(ProjectBoard, "vNtkGmHbPX1xa6SZyxU4guds0IE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = ProjectBoard;
var _c;
__turbopack_context__.k.register(_c, "ProjectBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_app_projects_%5Bid%5D_page_tsx_6d84dd2b._.js.map