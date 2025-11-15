(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/dnd/SortableItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SortableItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SortableItem(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "820128317fe44906719b03e7f1c0efad9334a95a0ede4eff38986f4995de8792") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "820128317fe44906719b03e7f1c0efad9334a95a0ede4eff38986f4995de8792";
    }
    const { id, title, onOpen, assigneeName, status } = t0;
    let t1;
    if ($[1] !== id) {
        t1 = {
            id
        };
        $[1] = id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const { attributes, listeners, setNodeRef, transform, transition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])(t1);
    let t2;
    if ($[3] !== transform) {
        t2 = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform);
        $[3] = transform;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t2 || $[6] !== transition) {
        t3 = {
            transform: t2,
            transition,
            cursor: "grab"
        };
        $[5] = t2;
        $[6] = transition;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    const style = t3;
    let t4;
    if ($[8] !== status) {
        t4 = status ? String(status).toUpperCase() : "";
        $[8] = status;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const statusUpper = t4;
    let t5;
    if ($[10] !== assigneeName) {
        t5 = typeof assigneeName === "string" && assigneeName.trim().length > 0 ? assigneeName.trim() : "Unassigned";
        $[10] = assigneeName;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const assigneeLabel = t5;
    const t6 = `p-2 rounded border ${statusUpper === "FINISHED" ? "bg-green-100" : "bg-white"}`;
    let t7;
    if ($[12] !== onOpen) {
        t7 = ({
            "SortableItem[<div>.onClick]": ()=>onOpen && onOpen()
        })["SortableItem[<div>.onClick]"];
        $[12] = onOpen;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== title) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-medium",
            children: title
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[14] = title;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] !== assigneeLabel) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "Assigned to: ",
                assigneeLabel
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 100,
            columnNumber: 10
        }, this);
        $[16] = assigneeLabel;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "mx-2",
            children: "•"
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 108,
            columnNumber: 11
        }, this);
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const t11 = statusUpper || "TODO";
    let t12;
    if ($[19] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "Status: ",
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[19] = t11;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== t12 || $[22] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-gray-600 mt-1",
            children: [
                t9,
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t9;
        $[23] = t13;
    } else {
        t13 = $[23];
    }
    let t14;
    if ($[24] !== attributes || $[25] !== listeners || $[26] !== setNodeRef || $[27] !== style || $[28] !== t13 || $[29] !== t6 || $[30] !== t7 || $[31] !== t8) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: setNodeRef,
            style: style,
            ...attributes,
            ...listeners,
            className: t6,
            role: "button",
            onClick: t7,
            children: [
                t8,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[24] = attributes;
        $[25] = listeners;
        $[26] = setNodeRef;
        $[27] = style;
        $[28] = t13;
        $[29] = t6;
        $[30] = t7;
        $[31] = t8;
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    return t14;
}
_s(SortableItem, "+2L8crjQJ00chYdwZr8GQC241GI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c = SortableItem;
var _c;
__turbopack_context__.k.register(_c, "SortableItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/TaskBoard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TaskBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// frontend/src/components/TaskBoard.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dnd$2f$SortableItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dnd/SortableItem.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EmptyDropPad(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "1508b4fbbfba2b13e09d0cd0fe9e8dc637ac5ad4bb9dc8d67a1198fc0869c3f5") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1508b4fbbfba2b13e09d0cd0fe9e8dc637ac5ad4bb9dc8d67a1198fc0869c3f5";
    }
    const { colId } = t0;
    const dropId = `empty-${colId}`;
    let t1;
    if ($[1] !== dropId) {
        t1 = {
            id: dropId
        };
        $[1] = dropId;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const { setNodeRef, isOver } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"])(t1);
    const t2 = isOver ? 0.7 : 0.08;
    let t3;
    if ($[3] !== t2) {
        t3 = {
            minHeight: 48,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: t2
        };
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const t4 = isOver ? "Release to drop" : "";
    let t5;
    if ($[5] !== setNodeRef || $[6] !== t3 || $[7] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: setNodeRef,
            "data-empty-pad": true,
            style: t3,
            className: "bg-white/10",
            children: t4
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
            lineNumber: 78,
            columnNumber: 10
        }, this);
        $[5] = setNodeRef;
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    return t5;
}
_s(EmptyDropPad, "OMEW8Hck2kMrBB8Yn9LGK1pN6RM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"]
    ];
});
_c = EmptyDropPad;
function TaskBoard(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "1508b4fbbfba2b13e09d0cd0fe9e8dc637ac5ad4bb9dc8d67a1198fc0869c3f5") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1508b4fbbfba2b13e09d0cd0fe9e8dc637ac5ad4bb9dc8d67a1198fc0869c3f5";
    }
    const { columns: t1, onMove, onColumnsChange, onAddTask, onOpenTask, onDeleteColumn, isManager: t2 } = t0;
    let t3;
    if ($[1] !== t1) {
        t3 = t1 === undefined ? [] : t1;
        $[1] = t1;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const columns = t3;
    const isManager = t2 === undefined ? false : t2;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            activationConstraint: {
                distance: 5
            }
        };
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], t4));
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {};
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const [newTaskTitles, setNewTaskTitles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t5);
    let t6;
    if ($[5] !== columns) {
        t6 = function findColumnByContainedId(id) {
            if (id.startsWith("empty-")) {
                const cid = id.slice(6);
                const byCol = columns.find({
                    "TaskBoard[findColumnByContainedId > columns.find()]": (c)=>c.id === cid
                }["TaskBoard[findColumnByContainedId > columns.find()]"]);
                if (byCol) {
                    return {
                        column: byCol,
                        matchedBy: "empty-pad",
                        rawId: id
                    };
                }
            }
            const byTask = columns.find({
                "TaskBoard[findColumnByContainedId > columns.find()]": (c_0)=>(c_0.tasks || []).some({
                        "TaskBoard[findColumnByContainedId > columns.find() > (anonymous)()]": (t)=>t.id === id
                    }["TaskBoard[findColumnByContainedId > columns.find() > (anonymous)()]"])
            }["TaskBoard[findColumnByContainedId > columns.find()]"]);
            if (byTask) {
                return {
                    column: byTask,
                    matchedBy: "task",
                    rawId: id
                };
            }
            const byCol_0 = columns.find({
                "TaskBoard[findColumnByContainedId > columns.find()]": (c_1)=>c_1.id === id
            }["TaskBoard[findColumnByContainedId > columns.find()]"]);
            if (byCol_0) {
                return {
                    column: byCol_0,
                    matchedBy: "column",
                    rawId: id
                };
            }
            return null;
        };
        $[5] = columns;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const findColumnByContainedId = t6;
    let t7;
    if ($[7] !== columns || $[8] !== findColumnByContainedId || $[9] !== onColumnsChange || $[10] !== onMove) {
        t7 = async function handleDragEnd(event) {
            const { active, over } = event;
            if (!over) {
                return;
            }
            const activeId = String(active.id);
            const overId = String(over.id);
            if (activeId === overId) {
                return;
            }
            const sourceInfo = findColumnByContainedId(activeId);
            const destInfo = findColumnByContainedId(overId);
            if (!sourceInfo || !destInfo) {
                return;
            }
            const sourceCol = sourceInfo.column;
            const destCol = destInfo.column;
            const prevCols = columns.map(_TaskBoardHandleDragEndColumnsMap);
            if (sourceCol.id === destCol.id && sourceInfo.matchedBy === "task" && destInfo.matchedBy === "task") {
                const sourceIndex = sourceCol.tasks.findIndex({
                    "TaskBoard[handleDragEnd > sourceCol.tasks.findIndex()]": (t_0)=>t_0.id === activeId
                }["TaskBoard[handleDragEnd > sourceCol.tasks.findIndex()]"]);
                const destIndex = destCol.tasks.findIndex({
                    "TaskBoard[handleDragEnd > destCol.tasks.findIndex()]": (t_1)=>t_1.id === overId
                }["TaskBoard[handleDragEnd > destCol.tasks.findIndex()]"]);
                if (sourceIndex === -1 || destIndex === -1) {
                    return;
                }
                const newTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])([
                    ...sourceCol.tasks
                ], sourceIndex, destIndex);
                const newCols = columns.map({
                    "TaskBoard[handleDragEnd > columns.map()]": (c_3)=>c_3.id === sourceCol.id ? {
                            ...c_3,
                            tasks: newTasks
                        } : c_3
                }["TaskBoard[handleDragEnd > columns.map()]"]);
                onColumnsChange?.(newCols);
                try {
                    await onMove(activeId, destCol.id, destIndex);
                } catch  {
                    onColumnsChange?.(prevCols);
                }
                return;
            }
            const srcTasks = [
                ...sourceCol.tasks || []
            ];
            const dstTasks = [
                ...destCol.tasks || []
            ];
            const sourceIndex_0 = srcTasks.findIndex({
                "TaskBoard[handleDragEnd > srcTasks.findIndex()]": (t_2)=>t_2.id === activeId
            }["TaskBoard[handleDragEnd > srcTasks.findIndex()]"]);
            if (sourceIndex_0 === -1) {
                return;
            }
            let destIndex_0 = dstTasks.findIndex({
                "TaskBoard[handleDragEnd > dstTasks.findIndex()]": (t_3)=>t_3.id === overId
            }["TaskBoard[handleDragEnd > dstTasks.findIndex()]"]);
            if (destIndex_0 === -1) {
                destIndex_0 = dstTasks.length;
            }
            const [moved] = srcTasks.splice(sourceIndex_0, 1);
            dstTasks.splice(destIndex_0, 0, moved);
            const newCols_0 = columns.map({
                "TaskBoard[handleDragEnd > columns.map()]": (c_4)=>{
                    if (c_4.id === sourceCol.id) {
                        return {
                            ...c_4,
                            tasks: srcTasks
                        };
                    }
                    if (c_4.id === destCol.id) {
                        return {
                            ...c_4,
                            tasks: dstTasks
                        };
                    }
                    return c_4;
                }
            }["TaskBoard[handleDragEnd > columns.map()]"]);
            onColumnsChange?.(newCols_0);
            try {
                await onMove(activeId, destCol.id, destIndex_0);
            } catch  {
                onColumnsChange?.(prevCols);
            }
        };
        $[7] = columns;
        $[8] = findColumnByContainedId;
        $[9] = onColumnsChange;
        $[10] = onMove;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    const handleDragEnd = t7;
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = function handleDragStart(_e) {};
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    const handleDragStart = t8;
    let t9;
    if ($[13] !== newTaskTitles || $[14] !== onAddTask) {
        t9 = async function handleAddTask(columnId) {
            const title = (newTaskTitles[columnId] || "").trim();
            if (!title) {
                return;
            }
            setNewTaskTitles({
                "TaskBoard[handleAddTask > setNewTaskTitles()]": (s)=>({
                        ...s,
                        [columnId]: ""
                    })
            }["TaskBoard[handleAddTask > setNewTaskTitles()]"]);
            if (onAddTask) {
                ;
                try {
                    await onAddTask(columnId, title);
                } catch (t10) {
                    setNewTaskTitles({
                        "TaskBoard[handleAddTask > setNewTaskTitles()]": (s_0)=>({
                                ...s_0,
                                [columnId]: title
                            })
                    }["TaskBoard[handleAddTask > setNewTaskTitles()]"]);
                }
            }
        };
        $[13] = newTaskTitles;
        $[14] = onAddTask;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    const handleAddTask = t9;
    let t10;
    if ($[16] !== onDeleteColumn) {
        t10 = async function handleDeleteColumn(column) {
            if ((column.tasks || []).length > 0) {
                alert("Cannot delete a column that contains tasks. Remove tasks first.");
                return;
            }
            if (!confirm(`Delete column "${column.title}"? This cannot be undone.`)) {
                return;
            }
            if (!onDeleteColumn) {
                return;
            }
            ;
            try {
                await onDeleteColumn(column.id);
            } catch (t11) {
                const err_0 = t11;
                console.error("delete column failed", err_0);
                alert("Failed to delete column");
            }
        };
        $[16] = onDeleteColumn;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    const handleDeleteColumn = t10;
    const statusOf = _TaskBoardStatusOf;
    let t11;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            minHeight: "60vh"
        };
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== columns || $[20] !== handleAddTask || $[21] !== handleDeleteColumn || $[22] !== isManager || $[23] !== newTaskTitles || $[24] !== onOpenTask) {
        let t13;
        if ($[26] !== handleAddTask || $[27] !== handleDeleteColumn || $[28] !== isManager || $[29] !== newTaskTitles || $[30] !== onOpenTask) {
            t13 = ({
                "TaskBoard[columns.map()]": (col)=>{
                    const inProgressCount = (col.tasks || []).filter({
                        "TaskBoard[columns.map() > (anonymous)()]": (t_5)=>statusOf(t_5) === "IN_PROGRESS"
                    }["TaskBoard[columns.map() > (anonymous)()]"]).length;
                    const doneCount = (col.tasks || []).filter({
                        "TaskBoard[columns.map() > (anonymous)()]": (t_6)=>statusOf(t_6) === "FINISHED"
                    }["TaskBoard[columns.map() > (anonymous)()]"]).length;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 bg-gray-100 rounded overflow-hidden",
                        style: {
                            width: 320,
                            display: "flex",
                            flexDirection: "column",
                            height: "70vh"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2 border-b bg-white flex items-center justify-between",
                                style: {
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-sm truncate",
                                                children: col.title
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                lineNumber: 377,
                                                columnNumber: 57
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mr-2",
                                                        children: [
                                                            "In-Progress: ",
                                                            inProgressCount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 161
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Done: ",
                                                            doneCount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 221
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                lineNumber: 377,
                                                columnNumber: 122
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                        lineNumber: 377,
                                        columnNumber: 16
                                    }, this),
                                    isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "TaskBoard[columns.map() > <button>.onClick]": ()=>handleDeleteColumn(col)
                                            }["TaskBoard[columns.map() > <button>.onClick]"],
                                            className: "text-sm text-red-600 px-2 py-1 border rounded",
                                            title: "Delete column (only if empty)",
                                            children: "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 377,
                                            columnNumber: 317
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                        lineNumber: 377,
                                        columnNumber: 276
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 375,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 overflow-y-auto",
                                style: {
                                    flex: 1
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                                    items: (col.tasks || []).map(_TaskBoardColumnsMapAnonymous),
                                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: (col.tasks || []).length > 0 ? (col.tasks || []).map({
                                            "TaskBoard[columns.map() > (anonymous)()]": (t_8)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dnd$2f$SortableItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    id: t_8.id,
                                                    title: t_8.title,
                                                    assigneeName: t_8.assigneeName,
                                                    status: t_8.status,
                                                    onOpen: {
                                                        "TaskBoard[columns.map() > (anonymous)() > <SortableItem>.onOpen]": ()=>onOpenTask?.(t_8.id)
                                                    }["TaskBoard[columns.map() > (anonymous)() > <SortableItem>.onOpen]"]
                                                }, t_8.id, false, {
                                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 72
                                                }, this)
                                        }["TaskBoard[columns.map() > (anonymous)()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyDropPad, {
                                            colId: col.id
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 385,
                                            columnNumber: 68
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                        lineNumber: 381,
                                        columnNumber: 133
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                    lineNumber: 381,
                                    columnNumber: 16
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 379,
                                columnNumber: 198
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-t bg-white",
                                style: {
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: newTaskTitles[col.id] || "",
                                            onChange: {
                                                "TaskBoard[columns.map() > <input>.onChange]": (e)=>setNewTaskTitles({
                                                        "TaskBoard[columns.map() > <input>.onChange > setNewTaskTitles()]": (prev)=>({
                                                                ...prev,
                                                                [col.id]: e.target.value
                                                            })
                                                    }["TaskBoard[columns.map() > <input>.onChange > setNewTaskTitles()]"])
                                            }["TaskBoard[columns.map() > <input>.onChange]"],
                                            placeholder: `New task in ${col.title}`,
                                            className: "flex-1 px-2 py-1 border rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 387,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "TaskBoard[columns.map() > <button>.onClick]": ()=>handleAddTask(col.id)
                                            }["TaskBoard[columns.map() > <button>.onClick]"],
                                            className: "px-3 py-1 bg-green-600 text-white rounded",
                                            children: "Add"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 394,
                                            columnNumber: 154
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                    lineNumber: 387,
                                    columnNumber: 16
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 385,
                                columnNumber: 130
                            }, this)
                        ]
                    }, col.id, true, {
                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                        lineNumber: 370,
                        columnNumber: 18
                    }, this);
                }
            })["TaskBoard[columns.map()]"];
            $[26] = handleAddTask;
            $[27] = handleDeleteColumn;
            $[28] = isManager;
            $[29] = newTaskTitles;
            $[30] = onOpenTask;
            $[31] = t13;
        } else {
            t13 = $[31];
        }
        t12 = columns.map(t13);
        $[19] = columns;
        $[20] = handleAddTask;
        $[21] = handleDeleteColumn;
        $[22] = isManager;
        $[23] = newTaskTitles;
        $[24] = onOpenTask;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[32] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 px-2",
                style: t11,
                children: t12
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                lineNumber: 421,
                columnNumber: 51
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
            lineNumber: 421,
            columnNumber: 11
        }, this);
        $[32] = t12;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    let t14;
    if ($[34] !== handleDragEnd || $[35] !== sensors || $[36] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
            sensors: sensors,
            collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
            onDragEnd: handleDragEnd,
            onDragStart: handleDragStart,
            children: t13
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[34] = handleDragEnd;
        $[35] = sensors;
        $[36] = t13;
        $[37] = t14;
    } else {
        t14 = $[37];
    }
    return t14;
}
_s1(TaskBoard, "HK3a+159F89MLdIVRKJ0EQS5qRY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c1 = TaskBoard;
function _TaskBoardColumnsMapAnonymous(t_7) {
    return t_7.id;
}
function _TaskBoardStatusOf(t_4) {
    return t_4.status ? String(t_4.status).toUpperCase() : "";
}
function _TaskBoardHandleDragEndColumnsMap(c_2) {
    return {
        ...c_2,
        tasks: [
            ...c_2.tasks || []
        ]
    };
}
var _c, _c1;
__turbopack_context__.k.register(_c, "EmptyDropPad");
__turbopack_context__.k.register(_c1, "TaskBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/TaskModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TaskModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// frontend/src/components/TaskModal.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function TaskModal({ task, teamMembers = [], assignedUserIds = [], onClose, onSave, onDelete }) {
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [assigneeId, setAssigneeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TODO");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // initialize local editable state when task changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskModal.useEffect": ()=>{
            if (!task) return;
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");
            setAssigneeId(task.assigneeId ?? null);
            setStatus(task.status ?? "TODO");
            setErr(null);
        }
    }["TaskModal.useEffect"], [
        task
    ]);
    if (!task) return null;
    // Build options: map members -> { user, member }, filter out members who already have
    // a task in THIS project (assignedUserIds) except allow current assignee to remain selectable.
    const options = (teamMembers || []).map((m)=>{
        const user = m.user ?? {
            id: m.id,
            name: undefined,
            email: undefined
        };
        return {
            member: m,
            user
        };
    }).filter(({ user: user_0 })=>{
        const isAssignedInThisProject = (assignedUserIds || []).includes(user_0.id);
        const isCurrentAssignee = task.assigneeId === user_0.id;
        if (isAssignedInThisProject && !isCurrentAssignee) return false;
        return true;
    });
    async function save() {
        setErr(null);
        setSaving(true);
        try {
            // normalize assigneeId: treat "", "null", undefined as null
            let assigneeForPayload = assigneeId ?? null;
            if (assigneeForPayload === "" || assigneeForPayload === "null") assigneeForPayload = null;
            // If task marked FINISHED we also clear assignee (as requested)
            if (status === "FINISHED") assigneeForPayload = null;
            const payload = {
                title: title.trim() || undefined,
                description: description.trim() || undefined,
                assigneeId: assigneeForPayload,
                status
            };
            const result = await onSave(payload);
            setSaving(false);
            onClose();
            return result;
        } catch (e) {
            setSaving(false);
            const msg = e?.body?.message ?? e?.message ?? "Save failed";
            setErr(msg);
            throw e;
        }
    }
    async function remove() {
        if (!confirm("Delete this task? This cannot be undone.")) return;
        setDeleting(true);
        try {
            await onDelete();
            setDeleting(false);
            onClose();
        } catch (e_0) {
            setDeleting(false);
            const msg_0 = e_0?.body?.message ?? e_0?.message ?? "Delete failed";
            setErr(msg_0);
        }
    }
    // helper to display label and indicator (🔴) when busyElsewhere
    const optionLabel = (user_1, busy)=>{
        const nameOrEmailOrId = user_1.name && user_1.name.trim() || user_1.email && user_1.email.trim() || user_1.id || 'Unknown';
        return busy ? `🔴 ${nameOrEmailOrId} (busy elsewhere)` : nameOrEmailOrId;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-2xl bg-white rounded shadow-lg p-6 z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-3",
                        children: "Edit task"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 text-sm text-red-600",
                        children: err
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2 text-sm",
                        children: "Title"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: title,
                        onChange: (e_1)=>setTitle(e_1.target.value),
                        className: "w-full px-3 py-2 border rounded mb-3"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2 text-sm",
                        children: "Description"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: description,
                        onChange: (e_2)=>setDescription(e_2.target.value),
                        className: "w-full px-3 py-2 border rounded mb-3",
                        rows: 5
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2 text-sm",
                        children: "Status"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: status ?? "TODO",
                        onChange: (e_3)=>setStatus(e_3.target.value),
                        className: "w-full px-3 py-2 border rounded mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "TODO",
                                children: "TODO"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "IN_PROGRESS",
                                children: "IN_PROGRESS"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "FINISHED",
                                children: "FINISHED"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2 text-sm",
                        children: "Assignee"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: assigneeId ?? "",
                        onChange: (e_4)=>{
                            const v = e_4.target.value;
                            setAssigneeId(v === "" ? null : v);
                        },
                        className: "w-full px-3 py-2 border rounded mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Unassigned"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            options.map(({ user: user_2, member })=>{
                                const busyElsewhere = !!member.busyElsewhere;
                                const label = optionLabel(user_2, busyElsewhere);
                                // inline style is a hint; some browsers ignore option styling — emoji ensures visibility
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: user_2.id,
                                    style: busyElsewhere ? {
                                        backgroundColor: "#fff0f0"
                                    } : undefined,
                                    children: label
                                }, user_2.id, false, {
                                    fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                    lineNumber: 167,
                                    columnNumber: 18
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: save,
                                        className: "bg-indigo-600 text-white px-4 py-2 rounded",
                                        disabled: saving,
                                        children: saving ? "Saving..." : "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "px-4 py-2 rounded border",
                                        disabled: saving || deleting,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: remove,
                                    className: "px-3 py-2 rounded bg-red-600 text-white",
                                    disabled: deleting,
                                    children: deleting ? "Deleting..." : "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/TaskModal.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/TaskModal.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/TaskModal.tsx",
        lineNumber: 133,
        columnNumber: 10
    }, this);
}
_s(TaskModal, "mR1jINLkF+bRyW5ypBAT6snx2xk=");
_c = TaskModal;
var _c;
__turbopack_context__.k.register(_c, "TaskModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$TaskBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/TaskBoard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$TaskModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/TaskModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function formatDateShort(dateStr) {
    if (!dateStr) return "—";
    try {
        const d = new Date(dateStr);
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(d);
    } catch  {
        return dateStr;
    }
}
function ProjectBoard() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const projectId = params.id;
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [teamMembers, setTeamMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newColTitle, setNewColTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [openTask, setOpenTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectBoard.useEffect": ()=>{
            if (!projectId) return;
            let cancelled = false;
            ({
                "ProjectBoard.useEffect": async ()=>{
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
                        if (cancelled) return;
                        setProject(normalized);
                        if (normalized.teamId) {
                            try {
                                const members = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeamMembers"])(normalized.teamId);
                                if (!cancelled) setTeamMembers(members || []);
                            } catch  {
                                if (!cancelled) setTeamMembers([]);
                            }
                        } else {
                            setTeamMembers([]);
                        }
                    } catch (err) {
                        if (!cancelled) setMsg("Failed to load project");
                    }
                }
            })["ProjectBoard.useEffect"]();
            return ({
                "ProjectBoard.useEffect": ()=>{
                    cancelled = true;
                }
            })["ProjectBoard.useEffect"];
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
            setProject((prev)=>prev ? {
                    ...prev,
                    columns: [
                        ...prev.columns,
                        newCol
                    ]
                } : prev);
            setNewColTitle("");
        } catch (err_0) {
            setMsg(err_0?.body?.message || "Failed to create column");
        }
    }
    function handleColumnsChange(cols) {
        setProject((prev_0)=>prev_0 ? {
                ...prev_0,
                columns: cols
            } : prev_0);
    }
    async function handleMove(taskId, targetColumnId, targetPosition) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moveTask"])(taskId, targetColumnId, targetPosition);
        } catch (err_1) {
            setMsg(err_1?.body?.message || "Failed to move task");
            throw err_1;
        }
    }
    async function handleAddTask(columnId, title_0) {
        setMsg(null);
        try {
            const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTask"])(columnId, title_0);
            setProject((prev_1)=>{
                if (!prev_1) return prev_1;
                const cols_0 = prev_1.columns.map((c_0)=>c_0.id === columnId ? {
                        ...c_0,
                        tasks: [
                            ...c_0.tasks || [],
                            t
                        ]
                    } : c_0);
                return {
                    ...prev_1,
                    columns: cols_0
                };
            });
        } catch (err_2) {
            setMsg(err_2?.body?.message || "Failed to create task");
            throw err_2;
        }
    }
    function handleOpenTask(taskId_0) {
        if (!project) return;
        for (const col_0 of project.columns || []){
            const t_0 = (col_0.tasks || []).find((x)=>x.id === taskId_0);
            if (t_0) {
                setOpenTask({
                    ...t_0,
                    columnId: col_0.id
                });
                return;
            }
        }
    }
    async function handleSaveTask(updates) {
        if (!openTask) throw new Error("no task open");
        setMsg(null);
        const taskId_1 = openTask.id;
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTask"])(taskId_1, updates);
            setProject((prev_2)=>{
                if (!prev_2) return prev_2;
                const cols_1 = prev_2.columns.map((c_1)=>({
                        ...c_1,
                        tasks: (c_1.tasks || []).map((t_1)=>t_1.id === taskId_1 ? {
                                ...t_1,
                                ...updated
                            } : t_1)
                    }));
                return {
                    ...prev_2,
                    columns: cols_1
                };
            });
            // refresh members
            if (project?.teamId) {
                try {
                    const members_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeamMembers"])(project.teamId);
                    setTeamMembers(members_0 || []);
                } catch  {
                // ignore
                }
            }
            setOpenTask((prev_3)=>({
                    ...prev_3 || {},
                    ...updated
                }));
            return updated;
        } catch (err_3) {
            setMsg(err_3?.body?.message || "Failed to save task");
            throw err_3;
        }
    }
    async function handleDeleteTask() {
        if (!openTask) throw new Error("no task open");
        const taskId_2 = openTask.id;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteTask"])(taskId_2);
            setProject((prev_4)=>{
                if (!prev_4) return prev_4;
                const cols_2 = prev_4.columns.map((c_2)=>({
                        ...c_2,
                        tasks: (c_2.tasks || []).filter((t_2)=>t_2.id !== taskId_2)
                    }));
                return {
                    ...prev_4,
                    columns: cols_2
                };
            });
            setOpenTask(null);
        } catch (err_4) {
            setMsg(err_4?.body?.message || "Failed to delete task");
            throw err_4;
        }
    }
    async function handleDeleteColumn(columnId_0) {
        setMsg(null);
        const col_1 = (project?.columns || []).find((c_3)=>c_3.id === columnId_0);
        if (!col_1) {
            setMsg("Column not found");
            return;
        }
        if ((col_1.tasks || []).length > 0) {
            setMsg("Cannot delete column that contains tasks. Remove tasks first.");
            return;
        }
        if (!confirm("Delete this column?")) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteColumn"])(columnId_0);
            setProject((prev_5)=>{
                if (!prev_5) return prev_5;
                return {
                    ...prev_5,
                    columns: prev_5.columns.filter((c_4)=>c_4.id !== columnId_0)
                };
            });
        } catch (err_5) {
            setMsg(err_5?.body?.message || "Failed to delete column");
        }
    }
    function computeAssignedUserIds() {
        if (!project) return [];
        const ids = [];
        for (const c_5 of project.columns || []){
            for (const t_3 of c_5.tasks || []){
                if (t_3.assigneeId) ids.push(t_3.assigneeId);
            }
        }
        return [
            ...new Set(ids)
        ];
    }
    const isManager = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ProjectBoard.useMemo[isManager]": ()=>{
            if (!user) return false;
            if (user.role === "admin") return true;
            const m = (teamMembers || []).find({
                "ProjectBoard.useMemo[isManager].m": (x_0)=>(x_0.user?.id ?? x_0.id) === user.id && [
                        "owner",
                        "admin"
                    ].includes(x_0.role)
            }["ProjectBoard.useMemo[isManager].m"]);
            return !!m;
        }
    }["ProjectBoard.useMemo[isManager]"], [
        user,
        teamMembers
    ]);
    if (!project) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-20 max-w-6xl mx-auto px-4",
        children: "Loading project..."
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 252,
        columnNumber: 24
    }, this);
    const totalTasks = project.columns?.reduce((acc, c_6)=>acc + (c_6.tasks?.length || 0), 0) ?? 0;
    const finishedTasks = project.columns?.reduce((acc_0, c_7)=>acc_0 + (c_7.tasks?.filter((t_4)=>t_4.status === "FINISHED").length || 0), 0) ?? 0;
    const progress = totalTasks === 0 ? 0 : Math.round(finishedTasks / totalTasks * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-slate-900",
                                children: project.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: project.description
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mt-3 text-sm",
                                children: [
                                    project.team && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-1 bg-slate-100 rounded text-slate-700",
                                        children: project.team.name
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 30
                                    }, this),
                                    project.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-600",
                                        children: [
                                            "Due ",
                                            formatDateShort(project.dueDate)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-600",
                                        children: [
                                            "Tasks: ",
                                            totalTasks
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-[220px] bg-white border rounded p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-500",
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-100 h-3 rounded overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${progress}%`
                                            },
                                            className: "h-3 bg-indigo-600 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium",
                                        children: [
                                            progress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Members: ",
                                            teamMembers.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Status: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 font-medium",
                                                children: project.status ?? "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                                lineNumber: 281,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 text-rose-600",
                children: msg
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 286,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: addColumn,
                    className: "flex gap-2 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: newColTitle,
                            onChange: (e_0)=>setNewColTitle(e_0.target.value),
                            placeholder: "New column title",
                            className: "px-3 py-2 border rounded flex-1"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-indigo-600 text-white px-4 py-2 rounded",
                            children: "Add column"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border rounded p-4 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$TaskBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    columns: project.columns,
                    onMove: handleMove,
                    onColumnsChange: handleColumnsChange,
                    onAddTask: handleAddTask,
                    onOpenTask: handleOpenTask,
                    onDeleteColumn: handleDeleteColumn,
                    isManager: isManager
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                    lineNumber: 296,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$TaskModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                task: openTask,
                projectId: project.id,
                teamMembers: teamMembers || [],
                assignedUserIds: computeAssignedUserIds(),
                onClose: ()=>setOpenTask(null),
                onSave: handleSaveTask,
                onDelete: handleDeleteTask
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 256,
        columnNumber: 10
    }, this);
}
_s(ProjectBoard, "Q+qHEzc9bARcNJ5T8afh640X8bo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
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

//# sourceMappingURL=frontend_src_62e372fd._.js.map