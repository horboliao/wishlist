import {database} from "@/lib/db";
import {NextResponse} from "next/server";
import {User} from ".prisma/client";
import {UserType} from "@/lib/type";

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
                    where: {
                      isPrivate: false
                    },
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

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId} = params;
        const values = await req.json();

        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const updatedUser = await database.user.update({
            where:{
                id: userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log("[EDIT_USER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId} = params;

        const user = await database.user.findUnique({ where: { id: userId } }) as UserType;

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const deletedUser = await database.user.delete({
            where:{
                id: userId
            }
        })
        const token = await database.verificationToken.deleteMany({
            where: {
                email: user.email
            }
        })

        return NextResponse.json(deletedUser);
    } catch (error) {
        console.log("[DELETE_USER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}