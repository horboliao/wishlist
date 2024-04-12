import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {BoardType} from "@/lib/type";
import Board from "@/app/components/wishes/Board";

interface WishDashboardProps {
    boards: BoardType[];
}
const WishDashboard = ({boards}:WishDashboardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Wishes</CardTitle>
                <CardDescription>Here's dashboard of your wishes</CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <div className={'px-16'}>
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
                </div>
            </CardContent>
        </Card>
    );
};

export default WishDashboard;