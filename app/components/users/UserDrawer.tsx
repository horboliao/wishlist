import React, {useEffect, useState} from 'react';
import {Drawer, DrawerHeader, DrawerTrigger, DrawerContent, DrawerDescription, DrawerFooter, DrawerClose, DrawerTitle, DrawerOverlay, DrawerPortal} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Calendar, User, X} from "lucide-react";
import axios from "axios";
import {calculateAge, formatDate} from "@/lib/date";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Board from "@/app/components/wishes/Board";
interface UserDrawerProps  {
    userId: string;
}
const UserDrawer = ({userId}:UserDrawerProps) => {
    const [user, setUser] = useState();

    useEffect(()=>{
        axios.get(`/api/${userId}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((e) => console.log("error fetching user", e))
    },[userId])

    if (!user) {
        return null;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className='flex cursor-pointer items-center px-2 py-1.5 text-sm'>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.firstName} {user.lastName}</span>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="relative">
                    <DrawerClose asChild className='absolute top-6 right-6 cursor-pointer'>
                        <X/>
                    </DrawerClose>
                    <DrawerHeader className='flex flex-row justify-between w-1/3'>
                        <div>
                            <DrawerTitle>{user.firstName} {user.lastName}</DrawerTitle>
                            <DrawerDescription>{user.email}</DrawerDescription>
                        </div>
                        <Button>Follow</Button>
                    </DrawerHeader>
                    <div className='flex flex-row items-start'>
                        <div className="p-4 pb-0 space-y-4 flex flex-row justify-between gap-4 w-1/3">
                            <div className="flex items-center space-x-4 rounded-md border py-4 pl-4 pr-24">
                                <Calendar/>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {calculateAge(new Date(user.birthday))} years
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(new Date(user.birthday))}
                                    </p>
                                </div>
                            </div>

                            <div className={'flex flex-row gap-4'}>
                                <div className="flex flex-col items-center space-y-1">
                                    <p className="text-2xl font-semibold leading-none">{user.followers.length}</p>
                                    <p className="text-sm text-muted-foreground">followers</p>
                                </div>
                                <div className="flex flex-col items-center space-y-1">
                                    <p className="text-2xl font-semibold leading-none">{user.following.length}</p>
                                    <p className="text-sm text-muted-foreground">followings</p>
                                </div>
                            </div>
                        </div>
                        <div className={'px-16 w-2/3'}>
                            <Carousel>
                                <CarouselContent className="-ml-1">
                                    {user.boards.map((board, index) => (
                                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                            <Board board={board} isDisabled/>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                    <DrawerFooter>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserDrawer;