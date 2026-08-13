import {NextResponse} from "next/server";
import {driver} from "@/lib/cognodb";

export async function GET() {
    try {
        await driver.verifyConnectivity();

        return NextResponse.json({
            status: "ok",
            database: "connected",
        });
    } catch (error) {
        console.error("Health check failed:", error);

        return NextResponse.json(
            {
                status: "error",
                database: "disconnected",
            },
            {status: 500}
        );
    }
}