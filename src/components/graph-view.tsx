"use client";
import {useMemo, useState} from "react";
import {Background, Controls, type Edge, MiniMap, type Node, ReactFlow,} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {GraphNode} from "./graph-node";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

type GraphViewProps = {
    nodes: Node[];
    edges: Edge[];
};


const nodeTypes = {
    graphNode: GraphNode,
};

const relationshipTypes = [
    "HAS_SKILL",
    "RELATED_TO",
    "BUILT",
    "USES",
    "BELONGS_TO",
];

export function GraphView({
                              nodes,
                              edges,
                          }: GraphViewProps) {
    const [enabledRelationships, setEnabledRelationships] = useState(new Set(relationshipTypes));
    const filteredEdges = useMemo(() => {
        return edges.filter(edge => {
            const relationship = String(edge.label ?? "");
            return enabledRelationships.has(relationship);
        })
    }, [edges, enabledRelationships]);

    function toggleRelationship(relationship: string) {
        setEnabledRelationships(current => {
            const next = new Set(current);
            if (next.has(relationship)) {
                next.delete(relationship);
            } else {
                next.add(relationship)
            }
            return next;
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-background p-4">
                <span className="text-sm font-medium">
                    Relationships
                </span>

                {relationshipTypes.map((relationship) => (
                    <div
                        key={relationship}
                        className="flex items-center gap-2"
                    >
                        <Checkbox
                            id={relationship}
                            checked={enabledRelationships.has(
                                relationship
                            )}
                            onCheckedChange={() =>
                                toggleRelationship(relationship)
                            }
                        />

                        <Label
                            htmlFor={relationship}
                            className="cursor-pointer text-xs"
                        >
                            {relationship}
                        </Label>
                    </div>
                ))}
            </div>

            <div className="h-180 w-full overflow-hidden rounded-xl border bg-muted/20">
                <ReactFlow
                    nodes={nodes}
                    edges={filteredEdges}
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
        </div>
    );
}