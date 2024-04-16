import {database} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string, boardId: string } }
) {

    try {
        const values = await req.json();
        const {userId, boardId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const board = await database.board.findUnique({
            where: {
                id: boardId
            }
        })

        if (!board) {
            return new NextResponse("There`s no such board!", { status: 404 });
        }

        const wish = await database.wish.create({
            data: {
                boardId,
                ...values
            }
        })

        return NextResponse.json(wish);
    } catch (error) {
        console.log("[NEW_WISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}