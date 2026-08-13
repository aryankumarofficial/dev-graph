import Link from "next/link";
import {ArrowRight, Building2, Code2, FolderGit2, GitBranch, Layers3, Users,} from "lucide-react";
import {StatCard} from "@/components/stat-card";
import {DeveloperCard} from "@/components/developer-card";
import {Button} from "@/components/ui/button";
import {getGraphStats} from "@/lib/queries/dashboard";
import {getDevelopers} from "@/lib/queries/developers";

export default async function HomePage() {
    const [stats, developers] = await Promise.all([
        getGraphStats(),
        getDevelopers(),
    ]);

    return (
        <main className="container mx-auto px-6 py-10">
            {/* Hero */}
            <section className="mb-12">
                <div className="max-w-3xl">
                    <div
                        className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        <GitBranch className="size-3.5"/>
                        Graph-powered developer intelligence
                    </div>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Understand developers through their connections.
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Explore relationships between developers, skills,
                        technologies, projects, and companies through an
                        interactive knowledge graph.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <Button className={"h-14 w-40 rounded-full"}>
                            <Link href="/developers" className={"flex items-center justify-center gap-1"}>
                                <span>
                                Explore developers
                                </span>
                                <ArrowRight/>
                            </Link>
                        </Button>

                        <Button variant="outline" className={"h-14 w-40 rounded-full"}>
                            <Link href="/graph?developer=dev-001" className={"flex items-center justify-center gap-1"}>
                                Open graph
                                <GitBranch/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="mb-12">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Graph Overview
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Entities currently available in DevGraph.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        label="Developers"
                        value={stats.developers}
                        icon={Users}
                    />

                    <StatCard
                        label="Skills"
                        value={stats.skills}
                        icon={Code2}
                    />

                    <StatCard
                        label="Technologies"
                        value={stats.technologies}
                        icon={Layers3}
                    />

                    <StatCard
                        label="Projects"
                        value={stats.projects}
                        icon={FolderGit2}
                    />

                    <StatCard
                        label="Companies"
                        value={stats.companies}
                        icon={Building2}
                    />
                </div>
            </section>

            {/* Developers */}
            <section>
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Developers
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Explore individual developer profiles and their
                            graph connections.
                        </p>
                    </div>

                    <Button variant="ghost">
                        <Link href="/developers">
                            View all
                            <ArrowRight/>
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {developers.slice(0, 5).map((developer) => (
                        <DeveloperCard
                            key={developer.id}
                            developer={developer}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}