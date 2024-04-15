import React, {useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/useCurrentUser";

const FormSchema = z.object({
    isPrivate: z.boolean().default(false),
    name: z.string().min(1, {
        message: "Name can`t be empty",
    }),
})
interface BoardFormProps {
    setOpen: (b: boolean) => void
    isPrivate?: boolean;
    name?: string;
    boardId?: string;
}
const BoardForm = ({setOpen, isPrivate, name, boardId}:BoardFormProps) => {
    const editMode: boolean = !!name && !!boardId;
    const router = useRouter();
    const user = useCurrentUser();
    const [deleteMode, setDeleteMode] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: editMode ?
            {
                isPrivate: isPrivate,
                name: name
            }
            :
            {
            isPrivate: true,
            name: ""
            },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (deleteMode) {
            await onDelete()
        } else if (editMode) {
            try {
                await axios.patch(`/api/${user?.id}/board/${boardId}`, data);
                toast({
                    title: "Board edited successfully",
                    description: "You can make changes when you want to.",
                })
                setOpen(false)
                form.reset();
                router.refresh();
            } catch {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to edit the board. Try again",
                })
            }
        } else {
            try {
                await axios.post(`/api/${user?.id}/board`, data);
                toast({
                    title: "New board created",
                    description: "Now, you can add your wishes there.",
                })
                setOpen(false)
                form.reset();
                router.refresh();
            } catch {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to create the board. Try again",
                })
            }
        }
    }

    async function onDelete() {
        try {
            await axios.delete(`/api/${user?.id}/board/${boardId}`);
            toast({
                title: "Board was deleted",
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
                <div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Top 5 things I need..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPrivate"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Make board private</FormLabel>
                                        <FormDescription>
                                            Private boards won`t be seen nobody but you.

                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button type="submit" className='w-full'>{editMode ? "Edit" : "Create"}</Button>
                    {editMode && <Button className='w-full' variant='destructive' onClick={()=>setDeleteMode(true)}>Delete</Button>}
                </div>
            </form>
        </Form>
    );
};

export default BoardForm;