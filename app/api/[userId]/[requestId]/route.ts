import {database} from "@/lib/db";
import {NextResponse} from "next/server";
import {FollowRequest} from ".prisma/client";

export async function PATCH(
    req: Request,
    { params }: { params: { requestId: string, userId: string } }
) {
    try {
        const { requestId, userId} = params;
        const values = await req.json();

        const followRequest = await database.followRequest.update({
            where: {
                id: requestId
            },
            data: {
                ...values,
            }
        });

        if (values.status === "VERIFIED") {
            const request = await database.followRequest.findUnique({
                where: {
                    id: requestId
                },
                include: {
                    follower: true
                }
            }) as FollowRequest;

            if (request) {
                const user = await database.user.findUnique({
                    where: {
                        id: userId
                    }
                });

                if (user) {
                    await database.follow.create({
                        data: {
                            followerId: request.followerId,
                            followingId: userId
                        }
                    });
                }
            }
        }

        return NextResponse.json(followRequest);
    } catch (error) {
        console.log("[REQUEST_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { requestId: string } }
) {
    try {

        const followRequest = await database.followRequest.findUnique({
            where: {
                id: params.requestId
            }
        });

        if (!followRequest) {
            return new NextResponse("Not found", { status: 404 });
        }

        const deletedRequest = await database.followRequest.delete({
            where: {
                id: params.requestId,
            },
        });

        return NextResponse.json(deletedRequest);
    } catch (error) {
        console.log("[REQUEST_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}