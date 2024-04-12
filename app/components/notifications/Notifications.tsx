import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FullnameType} from "@/lib/type";
import Notification from "@/app/components/notifications/Notification";
import {ScrollArea} from "@/components/ui/scroll-area";

interface NotificationsProps {
    notifications: FullnameType[];
}
const Notifications = ({notifications}:NotificationsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-48'>
                    {
                        notifications.map((notification) =>
                            <Notification firstname={notification.firstname} lastname={notification.lastname}/>
                        )
                    }
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default Notifications;