'use client'
import React, {useState} from 'react';
import {signOut} from "next-auth/react";
import {Calendar, Lock, LockOpen, Pencil, Plus} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {calculateAge, formatDate} from "@/lib/date";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import ProfileForm from "@/app/components/forms/ProfileForm";
import BoardForm from "@/app/components/forms/BoardForm";
import {ProfileType} from "@/lib/type";

interface Profile {
    id: string;
    isPrivate: boolean;
    firstname: string;
    lastname: string;
    email: string;
    birthday: Date;
    followers: number;
    following: number;

}
const Profile = ({id, isPrivate, following, followers, firstname, birthday, email, lastname}:Profile) => {
    const [open, setOpen] = useState(false)
    
    return (
        <Card className='flex flex-row gap-2 relative'>
            <div className='w-10/12'>
                <CardHeader>
                    <CardTitle>{firstname} {lastname}</CardTitle>
                    <CardDescription>{email}</CardDescription>
                </CardHeader>
                <CardContent className={'space-y-4'}>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                        <Calendar/>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {calculateAge(new Date(birthday))} years
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(new Date(birthday))}
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
                <CardFooter>
                    <Button className={'w-full'} onClick={()=>{signOut()}}>Sign out</Button>
                </CardFooter>
            </div>
            <div className='absolute top-2 right-2 flex flex-col space-y-0.5'>
                <Button
                    variant='outline'
                    size='sm'
                    disabled
                >{isPrivate ? <Lock size={16}/> : <LockOpen size={16}/>}</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant='outline'
                            size='sm'
                        > <Pencil size={16}/> </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                You can change it over here.
                            </DialogDescription>
                        </DialogHeader>
                        <ProfileForm
                            userId={id}
                            firstName={firstname}
                            lastName={lastname}
                            email={email}
                            birthday={birthday}
                            setOpen={setOpen}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
};

export default Profile;