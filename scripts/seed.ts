import {driver} from "@/lib/cognodb";

const developers = [
    {
        id: "dev-001",
        name: "Aryan Kumar",
        username: "aryan",
        bio: "Full-stack developer focused on modern web applications.",
    },
    {
        id: "dev-002",
        name: "Aarav Sharma",
        username: "aarav",
        bio: "Frontend developer specializing in React applications.",
    },
    {
        id: "dev-003",
        name: "Priya Mehta",
        username: "priya",
        bio: "Backend engineer building scalable APIs.",
    },
    {
        id: "dev-004",
        name: "Rohan Verma",
        username: "rohan",
        bio: "Full-stack engineer working with cloud applications.",
    },
    {
        id: "dev-005",
        name: "Ananya Singh",
        username: "ananya",
        bio: "Software engineer interested in data and distributed systems.",
    },
]

const skills = [
    {id: "skill-001", name: "JavaScript", category: "Programming"},
    {id: "skill-002", name: "TypeScript", category: "Programming"},
    {id: "skill-003", name: "React", category: "Frontend"},
    {id: "skill-004", name: "Node.js", category: "Backend"},
    {id: "skill-005", name: "Python", category: "Programming"},
    {id: "skill-006", name: "SQL", category: "Database"},
    {id: "skill-007", name: "GraphQL", category: "API"},
    {id: "skill-008", name: "Docker", category: "DevOps"},
];

const technologies = [
    {
        id: "tech-001",
        name: "Next.js",
        category: "Framework",
        description: "React framework for full-stack web applications.",
    },
    {
        id: "tech-002",
        name: "Express.js",
        category: "Backend",
        description: "Minimal Node.js web framework.",
    },
    {
        id: "tech-003",
        name: "PostgreSQL",
        category: "Database",
        description: "Open-source relational database.",
    },
    {
        id: "tech-004",
        name: "MongoDB",
        category: "Database",
        description: "Document-oriented NoSQL database.",
    },
    {
        id: "tech-005",
        name: "Docker",
        category: "DevOps",
        description: "Platform for containerized applications.",
    },
    {
        id: "tech-006",
        name: "GraphQL",
        category: "API",
        description: "Query language and runtime for APIs.",
    },
    {
        id: "tech-007",
        name: "Redis",
        category: "Infrastructure",
        description: "In-memory data store.",
    },
];

const companies = [
    {
        id: "company-001",
        name: "TechNova",
        industry: "Software",
    },
    {
        id: "company-002",
        name: "CloudWorks",
        industry: "Cloud Computing",
    },
    {
        id: "company-003",
        name: "DataSphere",
        industry: "Data & Analytics",
    },
];

const projects = [
    {
        id: "project-001",
        name: "DevBoard",
        description: "Developer productivity dashboard.",
        stars: 128,
        url: "https://github.com/example/devboard",
        companyId: "company-001",
    },
    {
        id: "project-002",
        name: "CloudNotes",
        description: "Collaborative cloud note-taking platform.",
        stars: 94,
        url: "https://github.com/example/cloudnotes",
        companyId: "company-002",
    },
    {
        id: "project-003",
        name: "DataLens",
        description: "Interactive data visualization platform.",
        stars: 217,
        url: "https://github.com/example/datalens",
        companyId: "company-003",
    },
    {
        id: "project-004",
        name: "TaskFlow",
        description: "Team task management application.",
        stars: 76,
        url: "https://github.com/example/taskflow",
        companyId: "company-001",
    },
    {
        id: "project-005",
        name: "APIHub",
        description: "Centralized API management platform.",
        stars: 163,
        url: "https://github.com/example/apihub",
        companyId: "company-002",
    },
];

const developerSkills = [
    ["dev-001", "skill-001"],
    ["dev-001", "skill-002"],
    ["dev-001", "skill-003"],
    ["dev-001", "skill-004"],
    ["dev-001", "skill-006"],

    ["dev-002", "skill-001"],
    ["dev-002", "skill-002"],
    ["dev-002", "skill-003"],

    ["dev-003", "skill-001"],
    ["dev-003", "skill-004"],
    ["dev-003", "skill-005"],
    ["dev-003", "skill-006"],
    ["dev-003", "skill-007"],

    ["dev-004", "skill-002"],
    ["dev-004", "skill-003"],
    ["dev-004", "skill-004"],
    ["dev-004", "skill-008"],

    ["dev-005", "skill-005"],
    ["dev-005", "skill-006"],
    ["dev-005", "skill-008"],
];

const developerProjects = [
    ["dev-001", "project-001"],
    ["dev-001", "project-004"],

    ["dev-002", "project-001"],
    ["dev-002", "project-002"],

    ["dev-003", "project-003"],
    ["dev-003", "project-005"],

    ["dev-004", "project-002"],
    ["dev-004", "project-004"],

    ["dev-005", "project-003"],
    ["dev-005", "project-005"],
];

const projectTechnologies = [
    ["project-001", "tech-001"],
    ["project-001", "tech-002"],
    ["project-001", "tech-003"],

    ["project-002", "tech-001"],
    ["project-002", "tech-004"],
    ["project-002", "tech-005"],

    ["project-003", "tech-003"],
    ["project-003", "tech-006"],

    ["project-004", "tech-001"],
    ["project-004", "tech-003"],
    ["project-004", "tech-007"],

    ["project-005", "tech-002"],
    ["project-005", "tech-005"],
    ["project-005", "tech-006"],
];

const technologyRelationships = [
    ["tech-001", "tech-002"],
    ["tech-001", "tech-003"],
    ["tech-002", "tech-003"],
    ["tech-005", "tech-007"],
    ["tech-006", "tech-002"],
];

const skillTechnologies = [
    ["skill-001", "tech-001"], // JavaScript → Next.js
    ["skill-001", "tech-002"], // JavaScript → Express.js

    ["skill-002", "tech-001"], // TypeScript → Next.js
    ["skill-002", "tech-002"], // TypeScript → Express.js

    ["skill-003", "tech-001"], // React → Next.js

    ["skill-004", "tech-002"], // Node.js → Express.js

    ["skill-006", "tech-003"], // SQL → PostgreSQL

    ["skill-007", "tech-006"], // GraphQL → GraphQL

    ["skill-008", "tech-005"], // Docker → Docker
];

async function seed() {
    const session = driver.session();
    try {
        console.log("Clearing existing graph...");

        await session.run(`
                  MATCH (n)
                  DETACH DELETE n
            `);
        console.log("Creating developers...");

        await session.run(
            `
      UNWIND $developers AS developer
      CREATE (d:Developer)
      SET d = developer
      `,
            {developers}
        );

        console.log("Creating skills...");

        await session.run(
            `
      UNWIND $skills AS skill
      CREATE (s:Skill)
      SET s = skill
      `,
            {skills}
        );

        console.log("Creating technologies...");

        await session.run(
            `
      UNWIND $technologies AS technology
      CREATE (t:Technology)
      SET t = technology
      `,
            {technologies}
        );

        console.log("Creating companies...");

        await session.run(
            `
      UNWIND $companies AS company
      CREATE (c:Company)
      SET c = company
      `,
            {companies}
        );

        console.log("Creating projects...");

        await session.run(
            `
      UNWIND $projects AS project
      CREATE (p:Project)
      SET p = project
      `,
            {projects}
        );

        console.log("Creating developer → skill relationships...");

        await session.run(
            `
      UNWIND $relationships AS rel
      MATCH (d:Developer {id: rel[0]})
      MATCH (s:Skill {id: rel[1]})
      CREATE (d)-[:HAS_SKILL]->(s)
      `,
            {relationships: developerSkills}
        );

        console.log("Creating developer → project relationships...");

        await session.run(
            `
      UNWIND $relationships AS rel
      MATCH (d:Developer {id: rel[0]})
      MATCH (p:Project {id: rel[1]})
      CREATE (d)-[:BUILT]->(p)
      `,
            {relationships: developerProjects}
        );

        console.log("Creating project → technology relationships...");

        await session.run(
            `
      UNWIND $relationships AS rel
      MATCH (p:Project {id: rel[0]})
      MATCH (t:Technology {id: rel[1]})
      CREATE (p)-[:USES]->(t)
      `,
            {relationships: projectTechnologies}
        );

        console.log("Creating technology relationships...");

        await session.run(
            `
      UNWIND $relationships AS rel
      MATCH (t1:Technology {id: rel[0]})
      MATCH (t2:Technology {id: rel[1]})
      CREATE (t1)-[:RELATED_TO]->(t2)
      `,
            {relationships: technologyRelationships}
        );

        console.log("Creating project → company relationships...");

        await session.run(`
      MATCH (p:Project)
      MATCH (c:Company {id: p.companyId})
      CREATE (p)-[:BELONGS_TO]->(c)
      REMOVE p.companyId
    `);

        console.log("Creating skill → technology relationships...");

        await session.run(
                            `
                  UNWIND $relationships AS rel
                  MATCH (s:Skill {id: rel[0]})
                  MATCH (t:Technology {id: rel[1]})
                  CREATE (s)-[:RELATED_TO]->(t)
                  `,
            {
                relationships: skillTechnologies,
            }
        );

        console.log("Seed completed successfully.");
    } finally {
        await session.close();
        await driver.close();
    }
}

seed().catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
});