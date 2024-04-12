import Profile from "@/app/components/Profile";
import boards, {FullnameType} from "@/lib/type";
import Notifications from "@/app/components/notifications/Notifications";
import CalendarCard from "@/app/components/callendar/CalendarCard";
import SearchFriends from "@/app/components/SearchFriends";
import WishDashboard from "@/app/components/wishes/WishDashboard";

export default function Home() {

// Визначаємо масив типу NotificationProps
    const notifications: FullnameType[] = [
        { firstname: "John", lastname: "Doe" },
        { firstname: "Alice", lastname: "Smith" },
        { firstname: "Bob", lastname: "Johnson" },
        { firstname: "John", lastname: "Doe" },
        { firstname: "Alice", lastname: "Smith" },
        { firstname: "Bob", lastname: "Johnson" },
        { firstname: "John", lastname: "Doe" },
        { firstname: "Alice", lastname: "Smith" },
        { firstname: "Bob", lastname: "Johnson" },
        { firstname: "John", lastname: "Doe" },
        { firstname: "Alice", lastname: "Smith" },
        { firstname: "Bob", lastname: "Johnson" },
    ];
  return (
    <main className={'p-8 space-y-6'}>
        <div className={'grid grid-cols-4 gap-6'}>
            <Profile
                firstname={'Olha'}
                lastname={'Horban'}
                email={'horbanolha64@gmail.com'}
                birthday={new Date()}
                followers={63}
                following={12}
            />
            <Notifications notifications={notifications}/>
            <CalendarCard/>
            <SearchFriends users={notifications}/>
        </div>
        <WishDashboard boards={boards}/>
    </main>
  );
}
