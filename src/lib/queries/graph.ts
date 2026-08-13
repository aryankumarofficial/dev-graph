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

    MATCH path =
        (d)-[
            :HAS_SKILL|
            BUILT|
            RELATED_TO|
            USES|
            BELONGS_TO
        *1..3]-(connected)

    WITH relationships(path) AS relationships

    UNWIND relationships AS rel

    WITH
        startNode(rel) AS source,
        endNode(rel) AS target,
        type(rel) AS relationship

    RETURN DISTINCT
        source.id AS sourceId,
        source.name AS sourceName,
        labels(source)[0] AS sourceType,
        target.id AS targetId,
        target.name AS targetName,
        labels(target)[0] AS targetType,
        relationship
    `,
        {developerId}
    );

    const nodeMap = new Map<string, GraphNode>();
    const edges: GraphEdge[] = [];

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

        edges.push({
            id: `${record.sourceId}-${record.relationship}-${record.targetId}`,
            source: record.sourceId,
            target: record.targetId,
            label: record.relationship,
        });
    }

    return {
        nodes: Array.from(nodeMap.values()),
        edges,
    };
}