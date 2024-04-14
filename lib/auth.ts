import { auth } from "@/auth";
import {UserType} from "@/lib/type";

export const currentUser = async () => {
    const session = await auth();
    return session?.user as UserType;
};