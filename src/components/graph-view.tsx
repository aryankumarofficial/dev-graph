"use client";

import {Background, Controls, type Edge, MiniMap, type Node, ReactFlow,} from "@xyflow/react";

type GraphViewProps = {
    nodes: Node[];
    edges: Edge[];
};

export function GraphView({
                              nodes,
                              edges,
                          }: GraphViewProps) {
    return (
        <div className="h-162.5 w-full overflow-hidden rounded-xl border bg-muted/20">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                attributionPosition="bottom-left"
            >
                <Background/>
                <Controls/>
                <MiniMap/>
            </ReactFlow>
        </div>
    );
}