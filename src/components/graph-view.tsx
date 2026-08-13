"use client";

import {Background, Controls, type Edge, MiniMap, type Node, ReactFlow,} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {GraphNode} from "./graph-node";

type GraphViewProps = {
    nodes: Node[];
    edges: Edge[];
};

const nodeTypes = {
    graphNode: GraphNode,
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
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                }}
            >
                <Background gap={16} size={1}/>
                <Controls/>
                <MiniMap/>
            </ReactFlow>
        </div>
    );
}