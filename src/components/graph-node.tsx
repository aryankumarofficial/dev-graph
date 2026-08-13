"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

const nodeStyles = {
    Developer: {
        label: "Developer",
        className: "border-primary bg-primary/10",
    },
    Skill: {
        label: "Skill",
        className: "border-blue-500/50 bg-blue-500/10",
    },
    Technology: {
        label: "Technology",
        className: "border-purple-500/50 bg-purple-500/10",
    },
    Project: {
        label: "Project",
        className: "border-emerald-500/50 bg-emerald-500/10",
    },
    Company: {
        label: "Company",
        className: "border-orange-500/50 bg-orange-500/10",
    },
} as const;

type GraphNodeData = {
    label: string;
    nodeType: string;
};

export function GraphNode({
                              data,
                          }: NodeProps & { data: GraphNodeData }) {
    const style =
        nodeStyles[data.nodeType as keyof typeof nodeStyles] ??
        nodeStyles.Technology;

    return (
        <div
            className={`min-w-37.5 rounded-xl border px-4 py-3 shadow-sm ${style.className}`}
        >
            <Handle
                type="target"
                position={Position.Left}
            />

            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {style.label}
            </div>

            <div className="mt-1 font-medium">
                {data.label}
            </div>

            <Handle
                type="source"
                position={Position.Right}
            />
        </div>
    );
}