import Link from "next/link";
import {notFound} from "next/navigation";

import {createGraphLayout} from "@/lib/graph/transform";
import {GraphView} from "@/components/graph-view";
import {IDeveloper} from "@/types/developer.type";
import {DeveloperGraph} from "@/types/graph.type";

interface PageProps {
    searchParams: Promise<{
        developer?: string;
    }>;
};

export default async function GraphPage({
                                            searchParams,
                                        }: PageProps) {
    const {developer} = await searchParams;

    const developerId = developer ?? "dev-001";

    // const developerData = await getDeveloperById(developerId);
    const devReq = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/developers/${developerId}`);
    const {developer: dev}: { developer: IDeveloper } = await devReq.json();
    if (!dev) {
        notFound();
    }

    // const graph = await getDeveloperGraph(developerId);
    const graphReq = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/graph/${developerId}`);
    const graph: DeveloperGraph = await graphReq.json();

    const {nodes, edges} = createGraphLayout(
        graph.nodes,
        graph.edges
    );

    return (
        <main className="container mx-auto px-6 py-10">
            <div className="mb-6">
                <Link
                    href={`/developers/${developerId}`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                >
                    ← Back to {dev.name}
                </Link>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                    Connection Graph
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Exploring relationships around{" "}
                    <span className="font-medium text-foreground">
                        {dev.name}
                    </span>
                </p>
            </div>

            <GraphView
                nodes={nodes}
                edges={edges}
            />
        </main>
    );
}