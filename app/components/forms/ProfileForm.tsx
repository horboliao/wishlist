import React, {useState} from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {useRouter} from "next/navigation";
import {Control, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {signOut} from "next-auth/react";
import {Switch} from "@/components/ui/switch";

const FormSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name cannot be empty.",
    }),
    lastName: z.string().min(1, {
        message: "Last name cannot be empty.",
    }),
    email: z.string().email({
        message: "Invalid email format.",
    }),
    birthday: z.date({
        required_error: "A date of birth is required.",
    }),
    isPrivate: z.boolean(),
})

interface ProfileFormProps {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    isPrivate: boolean;
    setOpen: (b: boolean) => void
}
const ProfileForm = ({userId, lastName, firstName, birthday, email, isPrivate, setOpen}:ProfileFormProps) => {
    const router = useRouter();
    const [deleteMode, setDeleteMode] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            birthday: new Date(birthday),
            isPrivate: isPrivate
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (deleteMode) {
            await onDelete()
        } else {
            try {
                await axios.patch(`/api/${userId}`, data);
                toast({
                    title: "Profile was updated",
                    description: "You can always change it.",
                })
                setOpen(false)
                form.reset();
                router.refresh();
            } catch {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to update the profile. Try again.",
                })
            }
        }
    }

    async function onDelete() {
        try {
            await axios.delete(`/api/${userId}`);
            toast({
                title: "You deleted your profile :(",
                description: "We gonna miss you...",
            })
            setOpen(false)
            await signOut();
            router.refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to delete your profile. Maybe you will change your mind :)",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <FormField
                        control={form.control as Control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john_doe@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex flex-row gap-2 justify-between'}>
                        <FormField
                            control={form.control as Control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control as Control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control as Control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as Control}
                        name="isPrivate"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Privacy
                                    </FormLabel>
                                    <FormDescription>
                                        Check it if you want to have a private profile
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
                <div className='flex flex-row gap-2'>
                    <Button type="submit" className={'w-full'}>Save</Button>
                    <Button className='w-full' variant='destructive' onClick={()=>setDeleteMode(true)}>Delete</Button>
                </div>
            </form>
        </Form>
    );
};

export default ProfileForm;