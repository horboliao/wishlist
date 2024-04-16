import React, {useState} from 'react';
import {z} from "zod";
import {Control, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {PriorityType} from "@/lib/type";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import PriorityIcon from "@/app/components/wishes/PriorityIcon";


const FormSchema = z.object({
    title: z.string().min(1, {
        message: "Title can`t be empty",
    }),
    priority: z.string().min(1, {
        message: "Priority can`t be empty",
    })
})
interface WishFormProps {
    setOpen: (b: boolean) => void
    title?: string;
    priority?: PriorityType;
    wishId?: string;
    boardId: string;
}
const WishForm = ({setOpen, title, priority, wishId, boardId}:WishFormProps) => {
    const editMode: boolean = !!title && !!wishId && !!priority;
    const router = useRouter();
    const user = useCurrentUser();
    const [deleteMode, setDeleteMode] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues:
            {
                title: title,
                priority: priority,
            }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (deleteMode) {
            await onDelete()
        } else if (editMode) {
            try {
                await axios.patch(`/api/${user?.id}/board/${boardId}/wish/${wishId}`, data);
                toast({
                    title: "Wish edited successfully",
                    description: "You can make changes when you want to.",
                })
                setOpen(false)
                form.reset();
                router.refresh();
            } catch {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to edit the wish. Try again",
                })
            }
        } else {
            try {
                await axios.post(`/api/${user?.id}/board/${boardId}/wish`, data);
                toast({
                    title: "New wish created",
                    description: "You can always change it.",
                })
                setOpen(false)
                form.reset();
                router.refresh();
            } catch {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to create the wish. Try again",
                })
            }
        }
    }

    async function onDelete() {
        try {
            await axios.delete(`/api/${user?.id}/board/${boardId}/wish/${wishId}`);
            toast({
                title: "Wish was deleted",
                description: "Wishes were deleted as well.",
            })
            setOpen(false)
            router.refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to delete the board. Try again",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control as Control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Bouquet of flowers..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as Control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a priority of your wish" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='LOW'>
                                            <PriorityIcon priority='LOW'/>
                                            Low
                                        </SelectItem>
                                        <SelectItem value='MEDIUM'>
                                            <PriorityIcon priority={PriorityType.MEDIUM}/>
                                            Medium
                                        </SelectItem>
                                        <SelectItem value='HIGH'>
                                            <PriorityIcon priority={PriorityType.HIGH}/>
                                            High
                                        </SelectItem>
                                        <SelectItem value='URGENT'>
                                            <PriorityIcon priority={PriorityType.URGENT}/>
                                            Urgent
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-row gap-2'>
                    <Button type="submit" className='w-full'>{editMode ? "Edit" : "Create"}</Button>
                    {editMode && <Button className='w-full' variant='destructive' onClick={()=>setDeleteMode(true)}>Delete</Button>}
                </div>
            </form>
        </Form>
    );
};

export default WishForm;