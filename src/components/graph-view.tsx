"use client";
import {useMemo, useState} from "react";
import {Background, ColorMode, Controls, type Edge, MiniMap, type Node, ReactFlow,} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {GraphNode} from "./graph-node";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {useTheme} from "next-themes";

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
    const {resolvedTheme} = useTheme()
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

    const visibleNodeIds = useMemo(() => {
        const ids = new Set<string>();
        for (const edge of filteredEdges) {
            ids.add(edge.source);
            ids.add(edge.target);
        }
        // Always keep the selected developer visible.
        const developerNode = nodes.find(
            node => node.data?.nodeType === "Developer",
        );
        if (developerNode) {
            ids.add(developerNode.id)
        }
        return ids;
    }, [filteredEdges, nodes])

    const filteredNodes = useMemo(() => {
        return nodes.filter((node) => visibleNodeIds.has(node.id));
    }, [nodes, visibleNodeIds]);

    const allEnabled =
        enabledRelationships.size === relationshipTypes.length;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-background p-4">
                <span className="text-sm font-medium">
                    Relationships
                </span>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="all-relationships"
                        checked={allEnabled}
                        onCheckedChange={(checked) => {
                            setEnabledRelationships(
                                checked
                                    ? new Set(relationshipTypes)
                                    : new Set()
                            );
                        }}
                    />

                    <Label
                        htmlFor="all-relationships"
                        className="cursor-pointer text-xs font-medium"
                    >
                        All
                    </Label>
                </div>
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
                    nodes={filteredNodes}
                    edges={filteredEdges}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{
                        padding: 0.2,
                    }}
                    colorMode={resolvedTheme as ColorMode}
                >
                    <Background gap={16} size={1}/>
                    <Controls
                        className="bg-background! border-border! text-foreground!"
                    />

                    <MiniMap
                        className="bg-background! border-border!"
                    />
                </ReactFlow>
            </div>
        </div>
    );
}