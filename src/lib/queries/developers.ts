import {DeveloperSkill, DeveloperTechnology, IDeveloper} from "@/types/developer.type";
import {runQuery} from "@/lib/cognodb";

export async function getDevelopers(): Promise<IDeveloper[]> {
    return await runQuery<IDeveloper>(
        `
        MATCH (d:Developer)
        RETURN
            d.id AS id,
            d.name AS name,
            d.username AS username,
            d.bio AS bio
        ORDER BY d.id
        `
    );
}

export async function getDeveloperById(developerId: string): Promise<IDeveloper> {
    const records = await runQuery<IDeveloper>(
        `
        MATCH (d:Developer {id:$developerId})
        RETURN
            d.id AS id,
            d.name AS name,
            d.username AS username,
            d.bio AS bio
        `,
        {developerId}
    )
    return records[0] ?? null;
}

export async function getDeveloperSkills(
    developerId: string,
): Promise<DeveloperSkill[]> {
    return runQuery<DeveloperSkill>(`
        MATCH (d:Developer {id:$developerId})
            -[:HAS_SKILL]->
            (s:Skill)
        RETURN
            s.id AS id,
            s.name AS name,
            s.category AS category
        ORDER BY s.id
    `,
        {developerId}
    )
}

export async function getDeveloperTechnologies(
    developerId: string,
): Promise<DeveloperTechnology[]> {
    return runQuery<DeveloperTechnology>(`
        MATCH (d:Developer {id:$developerId})
            -[:HAS_SKILL]->
            (s:Skill)
            -[:RELATED_TO]->
            (t:Technology)
        RETURN DISTINCT
            t.id AS id,
            t.name AS name,
            t.category AS category,
            t.description AS description
        ORDER BY s.id
    `,
        {developerId}
    )
}