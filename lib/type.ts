import {RequestStatus} from ".prisma/client";

export type TokenType = {
    id: string;
    email: string;
    token: string;
    expires: Date
}
export type UserCredType = {
    email: string;
    password: string;
}
export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
    isPrivate: boolean;
}

export type FullnameType = {
    id: string;
    firstName: string;
    lastName: string;
}

export type NotificationType = {
    id: string;
    status: RequestStatus;
    follower: FullnameType;
}

export type BoardType = {
    id: string;
    name: string;
    isPrivate: boolean;

    wishes: WishType[];
}

export type WishType = {
    id: string;
    title: string;
    priority: PriorityType;
}

export enum PriorityType {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}