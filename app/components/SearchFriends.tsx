import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calculator, Calendar, Smile, User} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {FullnameType} from "@/lib/type";

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
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {
                                users.map(user =>
                                    <CommandItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>{user.firstname} {user.lastname}</span>
                                    </CommandItem>
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