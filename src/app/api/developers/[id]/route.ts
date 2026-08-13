import {NextRequest, NextResponse} from "next/server";
import {getDeveloperById, getDeveloperSkills, getDeveloperTechnologies} from "@/lib/queries/developers";

export const GET = async (
    _req: NextRequest,
    ctx: RouteContext<"/api/developers/[id]">
) => {
    try {

        const {id} = await ctx.params
        const developer = await getDeveloperById(id);
        if (!developer) {
            return NextResponse.json(
                {
                    error: "Developer not found",
                },
                {
                    status: 404
                }
            )
        }

        const [skills, technologies] = await Promise.all([
            getDeveloperSkills(id),
            getDeveloperTechnologies(id)
        ])

        return NextResponse.json({
            developer,
            skills,
            technologies
        });

    } catch (error) {
        console.error("Failed To Fetch Developer: ", error);
        return NextResponse.json(
            {
                error: "Unable to Load Developer",
            },
            {
                status: 500
            }
        )
    }
}
