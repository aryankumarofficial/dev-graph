import {getDevelopers} from "@/lib/queries/developers";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const developers = await getDevelopers();
        return NextResponse.json(developers);
    } catch (error) {
        console.log("Failed to fetch Developers: ", error);
        return NextResponse.json({
            error: "Unable to Load Developers",
        }, {status: 500})
    }
}