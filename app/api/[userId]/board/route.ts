import {database} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {

    try {
        const { isPrivate, name } = await req.json();
        const {userId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const board = await database.board.create({
            data: {
                name, isPrivate,
                ownerId: userId
            }
        })

        return NextResponse.json(board);
    } catch (error) {
        console.log("[NEW_BOARD]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}