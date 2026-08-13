import neo4j from "neo4j-driver";

const uri = process.env["CONGODB_URI"];
const username = process.env["CONGODB_USERNAME"];
const password = process.env["CONGODB_PASSWORD"];

if (!uri || !username || !password) {
    throw new Error("Missing required argument");
}

export const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
)

export async function runQuery<T = unknown>(
    query: string,
    params: Record<string, unknown> = {},
): Promise<T[]> {
    const session = driver.session();
    try {
        const result = await session.run(query, params);
        return result.records.map(record => record.toObject() as T);
    } finally {
        await session.close();
    }
}