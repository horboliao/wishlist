'use client'
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { NotificationType} from "@/lib/type";
import Notification from "@/app/components/notifications/Notification";
import {ScrollArea} from "@/components/ui/scroll-area";

interface NotificationsProps {
    userId: string;
    notifications: NotificationType[];
}
const Notifications = ({notifications, userId}:NotificationsProps) => {
    console.log(notifications)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    notifications.length ?
                        <ScrollArea className='h-48'>
                            {
                                notifications.map((notification, index) =>
                                    <Notification
                                        key={index}
                                        userId={userId}
                                        firstname={notification.firstname}
                                        lastname={notification.lastname}
                                        requestId={notification.requestId}
                                        status={notification.status}
                                    />
                                )
                            }
                        </ScrollArea>
                        :
                        <p className='text-sm text-muted-foreground'>No notifications yet.</p>
                }

            </CardContent>
        </Card>
    );
};

export default Notifications;