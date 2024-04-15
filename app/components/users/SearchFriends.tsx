'use client'
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList
} from "@/components/ui/command";
import {FullnameType} from "@/lib/type";
import UserDrawer from "@/app/components/users/UserDrawer";

interface SearchFriendsProps {
    users: FullnameType [];
}
const SearchFriends = ({users}: SearchFriendsProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find friends</CardTitle>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <Command className="rounded-lg border shadow-md h-48">
                    <CommandInput placeholder="Type name to search..." />
                    <CommandList>
                        <CommandGroup heading="Suggestions">
                            {
                                users.map(user =>
                                    <UserDrawer userId={user.id}/>
                                )
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CardContent>
        </Card>
    );
};

export default SearchFriends;