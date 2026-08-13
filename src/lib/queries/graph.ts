import {DeveloperGraph, GraphEdge, GraphNode} from "@/types/graph.type";
import {runQuery} from "@/lib/cognodb";

export async function getDeveloperGraph(
    developerId: string
): Promise<DeveloperGraph> {
    const records = await runQuery<{
        sourceId: string;
        sourceName: string;
        sourceType: string;
        targetId: string;
        targetName: string;
        targetType: string;
        relationship: string;
    }>(
        `
        MATCH (d:Developer {id: $developerId})

        OPTIONAL MATCH (d)-[r1:HAS_SKILL]->(s:Skill)
        OPTIONAL MATCH (d)-[r2:BUILT]->(p:Project)
        OPTIONAL MATCH (s)-[r3:RELATED_TO]->(t:Technology)
        OPTIONAL MATCH (p)-[r4:USES]->(t2:Technology)
        OPTIONAL MATCH (p)-[r5:BELONGS_TO]->(c:Company)

        WITH [r1, r2, r3, r4, r5] AS relationships

        UNWIND relationships AS rel

        WITH rel
        WHERE rel IS NOT NULL

        RETURN DISTINCT
            startNode(rel).id AS sourceId,
            startNode(rel).name AS sourceName,
            labels(startNode(rel))[0] AS sourceType,
            endNode(rel).id AS targetId,
            endNode(rel).name AS targetName,
            labels(endNode(rel))[0] AS targetType,
            type(rel) AS relationship
        `,
        {developerId}
    );

    const nodeMap = new Map<string, GraphNode>();
    const edgeMap = new Map<string, GraphEdge>();

    for (const record of records) {
        nodeMap.set(record.sourceId, {
            id: record.sourceId,
            label: record.sourceName,
            type: record.sourceType,
        });

        nodeMap.set(record.targetId, {
            id: record.targetId,
            label: record.targetName,
            type: record.targetType,
        });

        const edgeId = `${record.sourceId}-${record.relationship}-${record.targetId}`;

        edgeMap.set(edgeId, {
            id: edgeId,
            source: record.sourceId,
            target: record.targetId,
            label: record.relationship,
        });
    }

    return {
        nodes: Array.from(nodeMap.values()),
        edges: Array.from(edgeMap.values()),
    };
}