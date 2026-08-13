import {getGraphStats} from "@/lib/queries/dashboard";
import {getDevelopers} from "@/lib/queries/developers";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const [stats, developers] = await Promise.all([
            getGraphStats(),
            getDevelopers(),
        ]);
        return NextResponse.json({stats, developers});
    } catch (error) {
        console.error("Failed to fetch Dashboard stats: ", error);
        return NextResponse.json({error: "Failed to load Dashboard stats"}, {status: 500});
    }
}