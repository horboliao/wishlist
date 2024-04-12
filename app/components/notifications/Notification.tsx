import React from 'react';
import {Button} from "@/components/ui/button";
interface NotificationProps {
    firstname: string;
    lastname: string;
}
const Notification = ({firstname, lastname}:NotificationProps) => {
    return (
        <div className="flex items-center space-x-4 rounded-md border p-4 mb-2">
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                    {firstname} {lastname}
                </p>
                <p className="text-sm text-muted-foreground">
                    wants to follow you
                </p>
            </div>
            <Button>Submit</Button>
        </div>
    );
};

export default Notification;