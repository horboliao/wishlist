'use client'
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email format.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})
const LoginCard = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await axios.post(`/api/login`, data);
            toast({
                title: "Successful login",
                description: "Now, you can access your data.",
            })
            router.refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to log in. Check your password and email again.",
            })
        }
    }
    return (
        <Card className="w-1/3 min-w-[360px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>You need to log in to have the access</CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="*****" {...field} type={'password'}/>
                                        </FormControl>
                                        <FormDescription>
                                            At least 8 characters
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className={'w-full'}>Log in</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Button asChild variant="link">
                    <Link href="/signup">New over here?</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginCard;