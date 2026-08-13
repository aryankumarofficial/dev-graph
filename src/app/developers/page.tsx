import React from 'react'
import {IDeveloper} from "@/types/developer.type";
import {DeveloperCard} from "@/components/developer-card";

async function DevelopersPage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/developers`);
    const developers = await response.json() as IDeveloper[];
    return (
        <main className={"container mx-auto px-6 py-10"}>
            <div className={"mb-8"}>
                <h1 className={"text-3xl font-semibold tracking-tight"}>
                    Developers
                </h1>
                <p className={"mt-2 text-muted-foreground"}>
                    Explore developers and their connections across skills,
                    technologies, projects, and companies.
                </p>

                {developers.length === 0 ? (
                    <div className="rounded-lg border p-10 text-center">
                        <p className="text-muted-foreground">
                            No developers found.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                        {developers.map((developer) => (
                            <DeveloperCard
                                key={developer.id}
                                developer={developer}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default DevelopersPage
