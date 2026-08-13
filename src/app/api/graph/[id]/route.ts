import {NextResponse} from "next/server";
import {getDeveloperGraph} from "@/lib/queries/graph";


export async function GET(
    _request: Request,
    {params}: RouteContext<"/api/graph/[id]">
) {
    try {
        const {id} = await params;

        const graph = await getDeveloperGraph(id);

        return NextResponse.json(graph);
    } catch (error) {
        console.error("Failed to fetch graph:", error);

        return NextResponse.json(
            {
                error: "Unable to load graph",
            },
            {status: 500}
        );
    }
}