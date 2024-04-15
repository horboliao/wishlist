import {database} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId} = params;
        const user = await database.user.findUnique({
            where: {
                id: userId
            }, include: {
                followers: true,
                following: true,
                boards: {
                    include: {
                        wishes: true
                    }
                }
            }
        })
        return NextResponse.json(user);
    } catch (error) {
        console.log("[USER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}