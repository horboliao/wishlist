'use client'
import React, {useState} from 'react';
import {BoardType, PriorityType, WishType} from "@/lib/type";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronsRight, Lock, LockOpen, Pencil, Plus} from "lucide-react";
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
import WishForm from "@/app/components/forms/WishForm";

interface BoardProps {
    board: BoardType;
}
const Board = ({board}: BoardProps) => {
    const {isPrivate, wishes, name} = board
    const [wish, setWish] = useState<WishType>();
    const [open, setOpen] = useState(false)
    const [openWish, setOpenWish] = useState(false)
    const [openWishEdit, setOpenWishEdit] = useState(false)
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
                    <Dialog open={openWish} onOpenChange={setOpenWish}>
                        <DialogTrigger asChild>
                            <Button variant='outline' size='sm'><Plus size={16}/></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add wish</DialogTitle>
                                <DialogDescription>
                                    Describe here what you wanna get.
                                </DialogDescription>
                            </DialogHeader>
                            <WishForm
                                setOpen={setOpenWish}
                                boardId={board.id}
                            />
                        </DialogContent>
                    </Dialog>
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
                <ScrollArea className='h-48 mt-2'>
                    <Dialog open={openWishEdit} onOpenChange={setOpenWishEdit}>
                    {
                        wishes.map((w) =>
                        <>
                                    <DialogTrigger asChild onClick={()=>{setWish(w)}}>
                                        <div className={'flex flex-row justify-between items-center rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100'}>
                                            <div className={'flex flex-row gap-2 items-center'}>
                                                <PriorityIcon priority={w.priority}/>
                                                <p className="text-sm leading-none">{w.title}</p>
                                            </div>
                                            <ChevronsRight className='text-muted-foreground' size={18}/>
                                        </div>
                                    </DialogTrigger>
                        </>

                        )
                    }
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit wish</DialogTitle>
                                <DialogDescription>
                                    Add your changes here.
                                </DialogDescription>
                            </DialogHeader>
                            {
                                wish && <WishForm
                                    setOpen={setOpenWishEdit}
                                    boardId={board.id}
                                    title={wish.title}
                                    priority={wish.priority}
                                    wishId={wish.id}
                            />
                            }
                        </DialogContent>
                    </Dialog>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default Board;