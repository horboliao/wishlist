import Profile from "@/app/components/Profile";
import {BoardType, FullnameType} from "@/lib/type";
import Notifications from "@/app/components/notifications/Notifications";
import CalendarCard from "@/app/components/callendar/CalendarCard";
import SearchFriends from "@/app/components/users/SearchFriends";
import WishDashboard from "@/app/components/wishes/WishDashboard";
import {currentUser} from "@/lib/auth";
import {database} from "@/lib/db";

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
            followRequests: {
                include: {
                    follower: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
        }
    })

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

    const requests = userExtended.followRequests.map(req => ({
        requestId: req.id,
        status: req.status,
        firstName: req.follower.firstName,
        lastName: req.follower.lastname,
    }));

    return (
        <main className={'p-8 space-y-6'}>
            <div className={'grid grid-cols-4 gap-6'}>
                <Profile
                    firstname={user.firstName}
                    lastname={user.lastName}
                    email={user.email}
                    birthday={user.birthday}
                    followers={userExtended.followers.length}
                    following={userExtended.following.length}
                />
                <Notifications userId={user.id} notifications={requests}/>
                <CalendarCard/>
                <SearchFriends users={users}/>
            </div>
            <WishDashboard boards={userExtended.boards as BoardType[]}/>
        </main>
    );
}
