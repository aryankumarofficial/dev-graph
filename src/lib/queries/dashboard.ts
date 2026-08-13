import {GraphStats} from "@/types/dashboard.type";
import {runQuery} from "@/lib/cognodb";

export async function getGraphStats(): Promise<GraphStats> {
    const records = await runQuery<GraphStats>(`
        MATCH (d:Developer)
        WITH count(d) AS developers

        OPTIONAL MATCH (s:Skill)
        WITH developers, count(s) AS skills

        OPTIONAL MATCH (t:Technology)
        WITH developers, skills, count(t) AS technologies

        OPTIONAL MATCH (p:Project)
        WITH developers, skills, technologies, count(p) AS projects

        OPTIONAL MATCH (c:Company)
        RETURN
            developers,
            skills,
            technologies,
            projects,
            count(c) AS companies
    `);

    return records[0] ?? {
        developers: 0,
        skills: 0,
        technologies: 0,
        projects: 0,
        companies: 0,
    };
}