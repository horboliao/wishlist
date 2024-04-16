import {NextResponse} from "next/server";
import {currentUser} from "@/lib/auth";
import {database} from "@/lib/db";
import {UserType} from "@/lib/type";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const user = await currentUser();
        const {userId} = params;

        const targetUser = await database.user.findUnique({
            where: { id: userId },
            select: { isPrivate: true }
        }) as UserType;

        if (!targetUser) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        if (targetUser.isPrivate) {
            const followRequest = await database.followRequest.create({
                data: {
                    authorId: user.id,
                    followerId: userId
                }
            });
            return NextResponse.json(followRequest);
        } else {
            const follow = await database.follow.create({
                data: {
                    follower: { connect: { id:  user.id } },
                    following: { connect: { id: userId } }
                }
            });
            return NextResponse.json(follow);
        }
    } catch (error) {
        console.log("[FOLLOW]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}