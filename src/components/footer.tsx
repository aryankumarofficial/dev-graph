import Link from "next/link";
import {GitBranch} from "lucide-react";
import {FaGithub} from "react-icons/fa6"

export function Footer() {
    return (
        <footer className="mt-auto border-t">
            <div
                className="container mx-auto flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <GitBranch className="size-4"/>
                    </div>

                    <div>
                        <p className="font-semibold">DevGraph</p>
                        <p className="text-sm text-muted-foreground">
                            Developer knowledge graph
                        </p>
                    </div>
                </div>

                <nav className="flex items-center gap-5 text-sm text-muted-foreground">
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground"
                    >
                        Overview
                    </Link>

                    <Link
                        href="/developers"
                        className="transition-colors hover:text-foreground"
                    >
                        Developers
                    </Link>

                    <Link
                        href="/graph"
                        className="transition-colors hover:text-foreground"
                    >
                        Graph
                    </Link>
                </nav>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Built with Next.js & CognoDB</span>

                    <Link
                        href="https://github.com/aryankumarofficial/dev-graph"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="transition-colors hover:text-foreground"
                    >
                        <FaGithub className="size-4"/>
                    </Link>
                </div>
            </div>

            <div className="border-t">
                <div className="container mx-auto px-6 py-4 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} DevGraph. Built by
                    <Link href={"https://www.linkedin.com/in/aryankumarofficial"}
                          target={"_blank"}
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="transition-colors hover:text-foreground ml-1"
                    >
                        Aryan Kumar.
                    </Link>
                </div>
            </div>
        </footer>
    );
}