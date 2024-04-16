'use client'
import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {BoardType} from "@/lib/type";
import Board from "@/app/components/wishes/Board";
import {Button} from "@/components/ui/button";
import {Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import BoardForm from "@/app/components/forms/BoardForm";

interface WishDashboardProps {
    boards: BoardType[];
}
const WishDashboard = ({boards}:WishDashboardProps) => {
    const [open, setOpen] = useState(false)
    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <div>
                    <CardTitle>Wishes</CardTitle>
                    <CardDescription>Here's dashboard of your wishes</CardDescription>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Add board</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add board</DialogTitle>
                            <DialogDescription>
                                After board creating you can add there your wishes
                            </DialogDescription>
                        </DialogHeader>
                        <BoardForm setOpen={setOpen}/>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <div className={'px-16'}>
                    {
                        boards.length === 0
                        ?
                            <div className="flex flex-col items-center text-sm leading-none text-muted-foreground">
                                No boards...
                            </div>
                            :
                            <Carousel>
                                <CarouselContent className="-ml-1">
                                    {boards.map((board, index) => (
                                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                            <Board board={board}/>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default WishDashboard;