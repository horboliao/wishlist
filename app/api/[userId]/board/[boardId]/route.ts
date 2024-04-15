import {database} from "@/lib/db";
import {NextResponse} from "next/server";

export async function PATCH(
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

        const existingBoard =  await database.board.findUnique({
            where: {
                id: boardId
            }
        })
        if (!existingBoard) {
            return new NextResponse("This board does`t exists!", { status: 404 });
        }

        const board = await database.board.update({
            where: {
                id: boardId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(board);
    } catch (error) {
        console.log("[EDITED_BOARD]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, boardId: string } }
) {

    try {
        const {userId, boardId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const existingBoard =  await database.board.findUnique({
            where: {
                id: boardId
            }
        })
        if (!existingBoard) {
            return new NextResponse("This board does`t exists!", { status: 404 });
        }

        const board = await database.board.delete({
            where: {
                id: boardId
            }
        })

        return NextResponse.json(board);
    } catch (error) {
        console.log("[DELETED_BOARD]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}