'use client'
import React from 'react';
import {BoardType} from "@/lib/type";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Lock, LockOpen} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import PriorityIcon from "@/app/components/wishes/PriorityIcon";

interface BoardProps {
    board: BoardType;
}
const Board = ({board}: BoardProps) => {
    const {isPrivate, wishes, name} = board
    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex flex-row gap-2'}>{isPrivate ? <Lock/> : <LockOpen/>} {name}</CardTitle>
            </CardHeader>
            <CardContent className={'space-y-1'}>
                <ScrollArea className='h-48'>
                    {
                        wishes.map((wish) =>
                            <div className={'flex flex-row gap-2 mb-2 items-center'}>
                                <PriorityIcon priority={wish.priority}/>
                                <p className="text-sm leading-none">{wish.title}</p>
                            </div>
                        )
                    }
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default Board;