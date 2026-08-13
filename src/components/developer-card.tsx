import {IDeveloper} from "@/types/developer.type";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowUpRight, Code2} from "lucide-react";

interface DeveloperCardProps {
    developer: IDeveloper
}

export function DeveloperCard({developer}: DeveloperCardProps) {
    return (
        <Link href={`/developers/${developer.id}`}>
            <Card className={"h-full transition-colors hover:bg-muted/50"}>
                <CardHeader>
                    <div className={"mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10"}>
                        <Code2 className="size-5 text-primary"/>
                    </div>
                    <div className={"flex items-start justify-between gap-4"}>
                        <div>
                            <CardTitle>{developer.name}</CardTitle>
                            <CardDescription className={"mt-1"}>
                                @{developer.username}
                            </CardDescription>
                        </div>
                        <ArrowUpRight className={"size-4 text-muted-foreground"}/>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className={"line-clamp-2 text-sm text-muted-foreground"}>
                        {developer.bio}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}