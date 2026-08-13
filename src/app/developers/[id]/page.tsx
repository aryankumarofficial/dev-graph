import {notFound} from "next/navigation";
import Link from "next/link";
import {ArrowLeft, ExternalLink, GitBranch, Star} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {DeveloperProject, DeveloperSkill, DeveloperTechnology} from "@/types/developer.type";
import {Metadata} from "next";
import {
    getDeveloperById,
    getDeveloperProjects,
    getDeveloperSkills,
    getDeveloperTechnologies
} from "@/lib/queries/developers";

interface PageProps {
    params: Promise<{
        id: string;
    }>
}


export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {
    const {id} = await params;

    const developer = await getDeveloperById(id);

    if (!developer) {
        return {
            title: "Developer Not Found",
            description: "The requested developer could not be found in DevGraph.",
        };
    }

    return {
        title: `${developer.name} — Developer Profile`,
        description:
            `${developer.name} (@${developer.username}) — explore their skills, technologies, projects, and company connections through the DevGraph knowledge graph.`,

        alternates: {
            canonical: `/developers/${developer.id}`,
        },

        openGraph: {
            title: `${developer.name} — Developer Profile | DevGraph`,
            description:
                `Explore ${developer.name}'s skills, technologies, projects, and graph connections.`,
            type: "profile",
            url: `/developers/${developer.id}`,
        },

        twitter: {
            card: "summary",
            title: `${developer.name} — Developer Profile | DevGraph`,
            description:
                `Explore ${developer.name}'s skills, technologies, projects, and graph connections.`,
        },
    };
}

export default async function ({params}: PageProps) {
    const {id} = await params;
    const developer = await getDeveloperById(id);

    const [skills, technologies, projects] = await Promise.all([
        getDeveloperSkills(id),
        getDeveloperTechnologies(id),
        getDeveloperProjects(id)
    ])
    if (!developer) {
        notFound();
    }
    return (
        <main className="container mx-auto max-w-6xl px-6 py-10">
            <Button variant="ghost" className="mb-6 -ml-3 w-32 h-14">
                <Link href="/developers" className={"flex items-center justify-center gap-1"}>
                    <ArrowLeft/>
                    Developers
                </Link>
            </Button>

            {/* Header */}
            <section className="mb-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div
                        className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-semibold text-primary">
                        {developer.name.charAt(0)}
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {developer.name}
                        </h1>

                        <p className="mt-1 text-muted-foreground">
                            @{developer.username}
                        </p>

                        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                            {developer.bio}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="mb-10 grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-2xl font-semibold">
                            {skills.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Skills
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <p className="text-2xl font-semibold">
                            {technologies.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Connected technologies
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <p className="text-2xl font-semibold">
                            {projects.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Projects
                        </p>
                    </CardContent>
                </Card>
            </section>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-wrap gap-2">
                        {skills.map((skill: DeveloperSkill) => (
                            <Badge
                                key={skill.id}
                                variant="secondary"
                            >
                                {skill.name}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>

                {/* Technologies */}
                <Card>
                    <CardHeader>
                        <CardTitle>Connected Technologies</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-wrap gap-2">
                        {technologies.map((technology: DeveloperTechnology) => (
                            <Badge
                                key={technology.id}
                                variant="outline"
                            >
                                {technology.name}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Projects */}
            <section className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Projects
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Projects built by this developer.
                        </p>
                    </div>

                    <Button size={"lg"} className="h-12 w-36">
                        <Link className={"flex flex-row items-center gap-1"} href={`/graph?developer=${developer.id}`}>
                            <GitBranch/>
                            <span>Explore graph</span>
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project: DeveloperProject) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle>
                                            {project.name}
                                        </CardTitle>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {project.company}
                                        </p>
                                    </div>

                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <ExternalLink className="size-4"/>
                                    </a>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {project.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Star
                                        className="size-4 hover:text-amber-500 hover:fill-amber-600 transition-colors duration-500"/>
                                    {project.stars}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    )
}