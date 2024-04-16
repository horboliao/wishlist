import Profile from "@/app/components/users/Profile";
import {BoardType, FullnameType, NotificationType} from "@/lib/type";
import Notifications from "@/app/components/notifications/Notifications";
import SearchFriends from "@/app/components/users/SearchFriends";
import WishDashboard from "@/app/components/wishes/WishDashboard";
import {currentUser} from "@/lib/auth";
import {database} from "@/lib/db";
import { RequestStatus} from ".prisma/client";

export default async function Home() {
    const user = await currentUser();

    const userExtended = await database.user.findUnique({
        where: {
            id: user.id
        }, include: {
            followers: true,
            following: true,
            boards: {
               include: {
                   wishes: true
               }
            },
        }
    })
    const notifications = await database.followRequest.findMany({
        where: {
            targetUserId: user.id,
            status:  RequestStatus.NEW
        },
        include: {
            follower: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    }) as NotificationType[];

    const users = await database.user.findMany({
        where:{
            id: {
                not: user.id
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    }) as FullnameType[];

    return (
        <main className={'p-8 space-y-6'}>
            <div className={'grid grid-cols-3 gap-6'}>
                <Profile
                    id={user.id}
                    isPrivate={user.isPrivate}
                    firstname={user.firstName}
                    lastname={user.lastName}
                    email={user.email}
                    birthday={user.birthday}
                    followers={userExtended.followers.length}
                    following={userExtended.following.length}
                />
                <Notifications userId={user.id} notifications={notifications}/>
                <SearchFriends users={users}/>
            </div>
            <WishDashboard boards={userExtended.boards as BoardType[]}/>
        </main>
    );
}
