(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/dnd/SortableItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/src/components/dnd/SortableItem.tsx
__turbopack_context__.s([
    "SortableItem",
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "8869c5415d41b7919dcde09ebb619728507b85d11ebd3f31ec0bc60228d3b2f6") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8869c5415d41b7919dcde09ebb619728507b85d11ebd3f31ec0bc60228d3b2f6";
    }
    const { id, title, onOpen } = t0;
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
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])(t1);
    let t2;
    if ($[3] !== transform) {
        t2 = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform);
        $[3] = transform;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const t3 = isDragging ? "grabbing" : "grab";
    const t4 = isDragging ? 50 : "auto";
    let t5;
    if ($[5] !== t2 || $[6] !== t3 || $[7] !== t4 || $[8] !== transition) {
        t5 = {
            transform: t2,
            transition,
            cursor: t3,
            zIndex: t4
        };
        $[5] = t2;
        $[6] = t3;
        $[7] = t4;
        $[8] = transition;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    const style = t5;
    let t6;
    if ($[10] !== title) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm truncate",
            children: title
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[10] = title;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== onOpen) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onOpen,
            className: "text-xs text-slate-500 ml-2",
            children: "⋯"
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[12] = onOpen;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== attributes || $[15] !== listeners || $[16] !== setNodeRef || $[17] !== style || $[18] !== t6 || $[19] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: setNodeRef,
            style: style,
            ...attributes,
            ...listeners,
            className: "p-2 bg-white rounded border flex items-center justify-between",
            children: [
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/components/dnd/SortableItem.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[14] = attributes;
        $[15] = listeners;
        $[16] = setNodeRef;
        $[17] = style;
        $[18] = t6;
        $[19] = t7;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    return t8;
}
_s(SortableItem, "9J/a3p2iAf7PAeqkD/B/H2PQwgk=", false, function() {
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

// frontend/src/components/TaskBoard.tsx
__turbopack_context__.s([
    "default",
    ()=>TaskBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dnd$2f$SortableItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dnd/SortableItem.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function EmptyDropPad(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "452e0eda8cbeae5493f30269b02f6617d3f7edeac328602f2b3029789a06c149") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "452e0eda8cbeae5493f30269b02f6617d3f7edeac328602f2b3029789a06c149";
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
            lineNumber: 73,
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "452e0eda8cbeae5493f30269b02f6617d3f7edeac328602f2b3029789a06c149") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "452e0eda8cbeae5493f30269b02f6617d3f7edeac328602f2b3029789a06c149";
    }
    const { columns: t1, onMove, onColumnsChange, onAddTask, onOpenTask } = t0;
    let t2;
    if ($[1] !== t1) {
        t2 = t1 === undefined ? [] : t1;
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const columns = t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            activationConstraint: {
                distance: 5
            }
        };
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], t3));
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {};
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const [newTaskTitles, setNewTaskTitles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t4);
    let t5;
    if ($[5] !== columns) {
        t5 = function findColumnByContainedId(id) {
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
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const findColumnByContainedId = t5;
    let t6;
    if ($[7] !== columns || $[8] !== findColumnByContainedId || $[9] !== onColumnsChange || $[10] !== onMove) {
        t6 = async function handleDragEnd(event) {
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
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const handleDragEnd = t6;
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = function handleDragStart(_e) {};
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    const handleDragStart = t7;
    let t8;
    if ($[13] !== newTaskTitles || $[14] !== onAddTask) {
        t8 = async function handleAddTask(columnId) {
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
                } catch (t9) {
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
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    const handleAddTask = t8;
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            minHeight: "60vh"
        };
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== columns || $[18] !== handleAddTask || $[19] !== newTaskTitles || $[20] !== onOpenTask) {
        let t11;
        if ($[22] !== handleAddTask || $[23] !== newTaskTitles || $[24] !== onOpenTask) {
            t11 = ({
                "TaskBoard[columns.map()]": (col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 bg-gray-100 rounded overflow-hidden",
                        style: {
                            width: 320,
                            display: "flex",
                            flexDirection: "column",
                            height: "70vh"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2 border-b bg-white",
                                style: {
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-sm truncate",
                                    children: col.title
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                    lineNumber: 333,
                                    columnNumber: 14
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 331,
                                columnNumber: 12
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
                                            "TaskBoard[columns.map() > (anonymous)()]": (t_5)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dnd$2f$SortableItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableItem"], {
                                                    id: t_5.id,
                                                    title: t_5.title,
                                                    onOpen: {
                                                        "TaskBoard[columns.map() > (anonymous)() > <SortableItem>.onOpen]": ()=>onOpenTask?.(t_5.id)
                                                    }["TaskBoard[columns.map() > (anonymous)() > <SortableItem>.onOpen]"]
                                                }, t_5.id, false, {
                                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 70
                                                }, this)
                                        }["TaskBoard[columns.map() > (anonymous)()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyDropPad, {
                                            colId: col.id
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 339,
                                            columnNumber: 66
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                        lineNumber: 335,
                                        columnNumber: 131
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                    lineNumber: 335,
                                    columnNumber: 14
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 333,
                                columnNumber: 85
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
                                            lineNumber: 341,
                                            columnNumber: 42
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "TaskBoard[columns.map() > <button>.onClick]": ()=>handleAddTask(col.id)
                                            }["TaskBoard[columns.map() > <button>.onClick]"],
                                            className: "px-3 py-1 bg-green-600 text-white rounded",
                                            children: "Add"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                            lineNumber: 348,
                                            columnNumber: 152
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                    lineNumber: 341,
                                    columnNumber: 14
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                                lineNumber: 339,
                                columnNumber: 128
                            }, this)
                        ]
                    }, col.id, true, {
                        fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                        lineNumber: 326,
                        columnNumber: 44
                    }, this)
            })["TaskBoard[columns.map()]"];
            $[22] = handleAddTask;
            $[23] = newTaskTitles;
            $[24] = onOpenTask;
            $[25] = t11;
        } else {
            t11 = $[25];
        }
        t10 = columns.map(t11);
        $[17] = columns;
        $[18] = handleAddTask;
        $[19] = newTaskTitles;
        $[20] = onOpenTask;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[26] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 px-2",
                style: t9,
                children: t10
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/TaskBoard.tsx",
                lineNumber: 370,
                columnNumber: 51
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[26] = t10;
        $[27] = t11;
    } else {
        t11 = $[27];
    }
    let t12;
    if ($[28] !== handleDragEnd || $[29] !== sensors || $[30] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
            sensors: sensors,
            collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
            onDragEnd: handleDragEnd,
            onDragStart: handleDragStart,
            children: t11
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/TaskBoard.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[28] = handleDragEnd;
        $[29] = sensors;
        $[30] = t11;
        $[31] = t12;
    } else {
        t12 = $[31];
    }
    return t12;
}
_s1(TaskBoard, "l8AERAIuQmms9iHpr6lW/Z2L+/I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c1 = TaskBoard;
function _TaskBoardColumnsMapAnonymous(t_4) {
    return t_4.id;
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
    // called by TaskBoard for optimistic updates & rollbacks
    function handleColumnsChange(cols) {
        setProject((prev_0)=>({
                ...prev_0 || {},
                columns: cols
            }));
    }
    // forward to API
    async function handleMove(taskId, targetColumnId, targetPosition) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moveTask"])(taskId, targetColumnId, targetPosition);
    }
    // called by TaskBoard footer add-button
    async function handleAddTask(columnId, title_0) {
        setMsg(null);
        try {
            const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTask"])(columnId, title_0);
            setProject((prev_1)=>({
                    ...prev_1 || {},
                    columns: (prev_1?.columns || []).map((c_0)=>c_0.id === columnId ? {
                            ...c_0,
                            tasks: [
                                ...c_0.tasks || [],
                                t
                            ]
                        } : c_0)
                }));
        } catch (err_1) {
            setMsg(err_1?.body?.message || "Failed to create task");
            throw err_1; // rethrow so TaskBoard can optionally react (we already cleared input)
        }
    }
    if (!project) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Loading project..."
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 86,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: project.name
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 text-red-600",
                children: msg
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 89,
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
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-slate-600 text-white px-3 py-2 rounded",
                            children: "Add column"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$TaskBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: project.columns,
                onMove: handleMove,
                onColumnsChange: handleColumnsChange,
                onAddTask: handleAddTask,
                onOpenTask: (taskId_0)=>console.log("open task", taskId_0)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/projects/[id]/page.tsx",
        lineNumber: 87,
        columnNumber: 10
    }, this);
}
_s(ProjectBoard, "Lo081BalsnNi9WF1gsbp8DpBYus=", false, function() {
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

//# sourceMappingURL=frontend_src_8254bfc0._.js.map