import {NextResponse} from "next/server";
import {runQuery} from "@/lib/cognodb";

export const GET = async () => {
    try {

        const result = await runQuery<{ ok: number }>(
            "RETURN 1 AS ok"
        )
        return NextResponse.json({
            status: "ok",
            database: "connected",
            result: result[0]?.ok,
        });

    } catch (err) {
        console.error("CongoDB Connection Failed", err);
        return NextResponse.json({
            status: "error",
            database: "disconnected",
        }, {status: 503});
    }
}