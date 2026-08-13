import Link from "next/link";
import { ArrowLeft, Code2, UserRoundX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DeveloperNotFound() {
    return (
        <section className="flex flex-1 items-center justify-center px-6 py-24">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border bg-muted/50">
                    <UserRoundX className="size-9 text-primary" />
                </div>

                <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
                    Developer Not Found
                </p>

                <h1 className="font-heading text-5xl tracking-tight sm:text-6xl">
                    This developer isn't in the graph.
                </h1>

                <p className="mt-6 text-muted-foreground">
                    We couldn't find a developer matching the requested
                    profile. The developer may have been removed or the
                    profile ID may be incorrect.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Button className={"flex items-center justify-center gap-2"}>
                        <Link href="/developers" className={"flex items-center justify-center gap-2"}>
                            <Code2 className="size-4" />
                            Explore Developers
                        </Link>
                    </Button>

                    <Button variant="outline" className={"flex items-center justify-center gap-2"}>
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