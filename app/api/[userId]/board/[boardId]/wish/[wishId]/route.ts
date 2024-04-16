import {database} from "@/lib/db";
import {NextResponse} from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, boardId: string, wishId: string } }
) {
    try {
        const values = await req.json();
        const {userId, boardId, wishId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const existingWish =  await database.wish.findUnique({
            where: {
                id: wishId
            }
        })

        if (!existingWish) {
            return new NextResponse("This wish does`t exists!", { status: 404 });
        }

        const wish = await database.wish.update({
            where: {
                id: wishId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(wish);
    } catch (error) {
        console.log("[EDITED_WISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, boardId: string, wishId: string } }
) {

    try {
        const {userId, wishId, boardId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const existingWish =  await database.wish.findUnique({
            where: {
                id: wishId
            }
        })
        if (!existingWish) {
            return new NextResponse("This wish does`t exists!", { status: 404 });
        }

        const wish = await database.wish.delete({
            where: {
                id: wishId
            }
        })

        return NextResponse.json(wish);
    } catch (error) {
        console.log("[DELETED_WISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}