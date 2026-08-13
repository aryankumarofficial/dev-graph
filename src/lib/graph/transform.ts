import type {Edge, Node} from "@xyflow/react";
import {GraphEdge, GraphNode} from "@/types/graph.type";

const columnConfig = {
    Developer: {
        x: 0,
    },
    Skill: {
        x: 350,
    },
    Technology: {
        x: 700,
    },
    Project: {
        x: 1050,
    },
    Company: {
        x: 1400,
    },
};

export function createGraphLayout(
    graphNodes: GraphNode[],
    graphEdges: GraphEdge[]
): {
    nodes: Node[];
    edges: Edge[];
} {
    const counters: Record<string, number> = {};

    const nodes: Node[] = graphNodes.map((node) => {
        const index = counters[node.type] ?? 0;

        counters[node.type] = index + 1;

        const column =
            columnConfig[node.type as keyof typeof columnConfig];

        return {
            id: node.id,
            position: {
                x: column?.x ?? 0,
                y: index * 140,
            },
            data: {
                label: node.label,
                nodeType:node.type
            },
            type: "graphNode",
        };
    });

    const edges: Edge[] = graphEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: false,
    }));

    return {
        nodes,
        edges,
    };
}