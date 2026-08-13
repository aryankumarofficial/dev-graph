"use client";

import {Background, Controls, type Edge, MiniMap, type Node, ReactFlow,} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

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
                fitViewOptions={{
                    padding: 0.2,
                }}
            >
                <Background gap={16} size={1}/>

                <Controls/>

                <MiniMap
                    pannable
                    zoomable
                />
            </ReactFlow>
        </div>
    );
}