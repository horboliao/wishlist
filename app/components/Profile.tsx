'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

interface Profile {
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;

}
const Profile = () => {
    return (
        <Card>

        </Card>
    );
};

export default Profile;