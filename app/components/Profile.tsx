'use client'
import React from 'react';
import { Calendar } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {calculateAge, formatDate} from "@/lib/date";

interface Profile {
    firstname: string;
    lastname: string;
    email: string;
    birthday: Date;
    followers: number;
    following: number;

}
const Profile = ({following, followers, firstname, birthday, email, lastname}:Profile) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{firstname} {lastname}</CardTitle>
                <CardDescription>{email}</CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Calendar/>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {calculateAge(birthday)} years
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(birthday)}
                        </p>
                    </div>
                </div>

                <div className={'flex flex-row gap-4'}>
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-2xl font-semibold leading-none">{followers}</p>
                        <p className="text-sm text-muted-foreground">followers</p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-2xl font-semibold leading-none">{following}</p>
                        <p className="text-sm text-muted-foreground">followings</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;