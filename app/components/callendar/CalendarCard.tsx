'use client'
import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useToast} from "@/components/ui/use-toast";
import {formatDate} from "@/lib/date";
import {FullnameType} from "@/lib/type";

const CalendarCard = () => {
    const { toast } = useToast();
    const [date, setDate] = useState<Date>(new Date())
    const [friends, setFriends] =  useState<FullnameType[]>()
    useEffect(()=>{
        toast({
            title: "Scheduled: Catch up",
            description: formatDate(date),
        })
    },[date])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            {format(date, "PPP")}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {
                    friends
                    ?
                        <p>No birthdays on {formatDate(date)}</p>
                        :
                        <div>
                            {
                                friends?.map((friend, index) => <p key={index}>{friend.firstname} {friend.lastname}</p>)
                            }
                        </div>
                }
            </CardContent>
        </Card>
    );
};

export default CalendarCard;