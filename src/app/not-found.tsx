import Link from "next/link";
import {ArrowLeft, GitBranch, SearchX} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="flex flex-1 items-center justify-center px-6 py-24">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border bg-muted/50">
                    <SearchX className="size-9 text-primary"/>
                </div>

                <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
                    404 — Page Not Found
                </p>

                <h1 className="font-heading text-5xl tracking-tight sm:text-6xl">
                    This page doesn't exist.
                </h1>

                <p className="mt-6 text-muted-foreground">
                    The page you're looking for doesn't exist or may have been
                    moved somewhere else in DevGraph.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Button className={"w-40 h-14 rounded-full"}>
                        <Link href="/" className={"flex items-center justify-center gap-2"}>
                            <GitBranch className="size-4"/>
                            Back to DevGraph
                        </Link>
                    </Button>

                    <Button className={"w-40 h-14 rounded-full"} variant="outline">
                        <Link href="/developers" className={"flex items-center justify-center gap-2"}>
                            <ArrowLeft className="size-4"/>
                            Developers
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}