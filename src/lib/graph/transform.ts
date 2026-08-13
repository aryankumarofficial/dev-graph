import type {Edge, Node} from "@xyflow/react";
import {GraphEdge, GraphNode} from "@/types/graph.type";

export function createGraphLayout(
    graphNodes: GraphNode[],
    graphEdges: GraphEdge[]
): {
    nodes: Node[];
    edges: Edge[];
} {
    const nodes: Node[] = graphNodes.map((node, index) => ({
        id: node.id,
        position: {
            x: (index % 4) * 260,
            y: Math.floor(index / 4) * 150,
        },
        data: {
            label: node.label,
        },
        type: "default",
    }));

    const edges: Edge[] = graphEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
    }));

    return {
        nodes,
        edges,
    };
}