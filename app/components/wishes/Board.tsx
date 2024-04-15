'use client'
import React, {useState} from 'react';
import {BoardType} from "@/lib/type";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Lock, LockOpen, Pencil, Plus} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import PriorityIcon from "@/app/components/wishes/PriorityIcon";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BoardForm from "@/app/components/forms/BoardForm";

interface BoardProps {
    board: BoardType;
}
const Board = ({board}: BoardProps) => {
    const {isPrivate, wishes, name} = board
    const [open, setOpen] = useState(false)
    return (
        <Card>
            <CardHeader className='relative'>
                <CardTitle className={'flex flex-row gap-2 w-10/12'}>{name}</CardTitle>
                <div className='absolute top-2 right-2 flex flex-col space-y-0.5'>
                    <Button
                        variant='outline'
                        size='sm'
                        disabled
                    >{isPrivate ? <Lock size={16}/> : <LockOpen size={16}/>}</Button>
                    <Button
                        variant='outline'
                        size='sm'
                    > <Plus size={16}/> </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                            > <Pencil size={16}/> </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit board</DialogTitle>
                                <DialogDescription>
                                    You can change it over here.
                                </DialogDescription>
                            </DialogHeader>
                            <BoardForm
                                setOpen={setOpen}
                                boardId={board.id}
                                name={board.name}
                                isPrivate={board.isPrivate}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
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