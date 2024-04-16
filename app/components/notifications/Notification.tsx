import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {RequestStatus} from ".prisma/client";
import {Check, X} from "lucide-react";
import {z} from "zod";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
interface NotificationProps {
    userId: string;
    firstname: string;
    lastname: string;
    requestId: string;
    status: RequestStatus;
}
const Notification = ({userId, requestId, status, firstname, lastname}:NotificationProps) => {
    const router = useRouter();
    const [isCancelled, setIsCancelled] = useState(false);
    async function onChange() {
        try {
            await axios.patch(`/api/${userId}/${requestId}`, JSON.stringify({status: isCancelled ? "CANCELLED" : "VERIFIED"}));
            if (isCancelled) {
                toast({
                    title: "Friendly request is cancelled",
                })
            } else {
                toast({
                    title: "You submitted this user successfully"
                })
            }
            router.refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to edit the request status. Try again",
            })
        }
    }
    const onCancel = () => {
        setIsCancelled(true);
        onChange();
    }

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
            <div className='flex flex-row items-center space-x-0.5'>
                <Button size='icon' onClick={onChange}><Check/></Button>
                <Button size='icon' variant='destructive' onClick={onCancel}><X size={20}/></Button>
            </div>
        </div>
    );
};

export default Notification;