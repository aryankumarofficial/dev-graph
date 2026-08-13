import Link from "next/link";
import { GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <GitBranch className="size-4" />
                    </div>

                    <span>DevGraph</span>
                </Link>

                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <Link
                        href="/"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Overview
                    </Link>

                    <Link
                        href="/developers"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Developers
                    </Link>

                    <Link
                        href="/graph?developer=dev-001"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Graph
                    </Link>
                </nav>

                <Button size="sm">
                    <Link href="/graph?developer=dev-001">
                        Explore Graph
                    </Link>
                </Button>
            </div>
        </header>
    );
}