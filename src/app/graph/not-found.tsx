import Link from "next/link";
import { ArrowLeft, GitBranch, Network } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GraphNotFound() {
    return (
        <section className="flex flex-1 items-center justify-center px-6 py-24">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border bg-muted/50">
                    <Network className="size-9 text-primary" />
                </div>

                <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
                    Graph Not Found
                </p>

                <h1 className="font-heading text-5xl tracking-tight sm:text-6xl">
                    This graph isn't available.
                </h1>

                <p className="mt-6 text-muted-foreground">
                    The requested developer graph could not be found. Check
                    the developer ID or return to DevGraph and choose a
                    developer from the graph.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Button className={"w-40 h-14 rounded-full"}>
                        <Link href="/developers" className={"flex items-center justify-center gap-2"}>
                            <Network className="size-4" />
                            Choose Developer
                        </Link>
                    </Button>

                    <Button variant="outline" className={"w-40 h-14 rounded-full"}>
                        <Link href="/" className={"flex items-center justify-center gap-2"}>
                            <ArrowLeft className="size-4" />
                            Back Home
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}