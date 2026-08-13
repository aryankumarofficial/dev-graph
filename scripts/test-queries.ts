import {driver} from "@/lib/cognodb";

async function run() {
    const session = driver.session();
    try {
        console.log("\n1. Developers");
        const developers = await session.run(`
              MATCH (d:Developer)
              RETURN d.id AS id, d.name AS name
              ORDER BY d.name
            `);

        console.table(
            developers.records.map((record) => ({
                id: record.get("id"),
                name: record.get("name"),
            }))
        );
        console.log("\n2. Developer skills");

        const skills = await session.run(
            `
                  MATCH (d:Developer {id: $developerId})
                        -[:HAS_SKILL]->
                        (s:Skill)
                  RETURN d.name AS developer, s.name AS skill
                  ORDER BY s.name
                  `,
                {
                    developerId: "dev-001",
                }
           );

        console.table(
            skills.records.map((record) => ({
                developer: record.get("developer"),
                skill: record.get("skill"),
            }))
        );
        console.log("\n3. Multi-hop: Developer → Skill → Technology");

        const technologies = await session.run(
            `
                  MATCH (d:Developer {id: $developerId})
                        -[:HAS_SKILL]->
                        (s:Skill)
                        -[:RELATED_TO]->
                        (t:Technology)
                  RETURN DISTINCT
                    d.name AS developer,
                    s.name AS skill,
                    t.name AS technology
                  ORDER BY technology
                  `,
            {
                developerId: "dev-001",
            }
        );

        console.table(
            technologies.records.map((record) => ({
                developer: record.get("developer"),
                skill: record.get("skill"),
                technology: record.get("technology"),
            }))
        );

        console.log("\n4. Full technology/project/company path");

        const paths = await session.run(
            `
                  MATCH path =
                    (d:Developer {id: $developerId})
                    -[:HAS_SKILL]->
                    (s:Skill)
                    -[:RELATED_TO]->
                    (t:Technology)
                    <-[:USES]-
                    (p:Project)
                    -[:BELONGS_TO]->
                    (c:Company)
                  RETURN
                    d.name AS developer,
                    s.name AS skill,
                    t.name AS technology,
                    p.name AS project,
                    c.name AS company
                  ORDER BY project
  `,
            {
                developerId: "dev-001",
            }
        );

        console.table(
            paths.records.map((record) => ({
                developer: record.get("developer"),
                skill: record.get("skill"),
                technology: record.get("technology"),
                project: record.get("project"),
                company: record.get("company"),
            }))
        );
    } finally {
        await session.close();
        await driver.close();
    }
}

run().catch((err) => {
    console.error("Query test failed:", err);
    process.exit(1);
})