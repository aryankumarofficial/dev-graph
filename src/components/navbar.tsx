import Link from "next/link";
import {GitBranch} from "lucide-react";

import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

export function Navbar() {
    return (
        <header
            className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <div
                        className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <GitBranch className="size-4"/>
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

                <div className="flex items-center gap-2">
                    <ThemeToggle/>

                    <Button size="sm">
                        <Link href="/graph?developer=dev-001">
                            Explore Graph
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}