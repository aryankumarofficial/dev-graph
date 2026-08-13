import {runQuery} from "@/lib/cognodb";
import {GraphStats} from "@/types/dashboard.type";


export async function getGraphStats(): Promise<GraphStats> {
    const records = await runQuery<{
        developers: number;
        skills: number;
        technologies: number;
        projects: number;
        companies: number;
    }>(`
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

    const stats = records[0];

    if (!stats) {
        return {
            developers: 0,
            skills: 0,
            technologies: 0,
            projects: 0,
            companies: 0,
        };
    }

    return {
        developers: Number(stats.developers),
        skills: Number(stats.skills),
        technologies: Number(stats.technologies),
        projects: Number(stats.projects),
        companies: Number(stats.companies),
    };
}