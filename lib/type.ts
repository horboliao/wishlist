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
    requestId: string;
    status: RequestStatus;
    firstname: string;
    lastname: string;
}

export type BoardType = {
    name: string;
    isPrivate: boolean;

    wishes: WishType[];
}

export type WishType = {
    title: string;
    description?: string;
    priority: PriorityType;
    links: string[];
}

export enum PriorityType {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}

const boards: BoardType[] = [
    {
        name: "Board 1",
        isPrivate: false,
        wishes: generateWishes(7)
    },
    {
        name: "Board 2",
        isPrivate: true,
        wishes: generateWishes(5)
    },
    {
        name: "Board 3",
        isPrivate: false,
        wishes: generateWishes(8)
    },
    {
        name: "Board 4",
        isPrivate: true,
        wishes: generateWishes(4)
    },
    {
        name: "Board 5",
        isPrivate: false,
        wishes: generateWishes(6)
    },
    {
        name: "Board 6",
        isPrivate: true,
        wishes: generateWishes(10)
    },
    {
        name: "Board 7",
        isPrivate: false,
        wishes: generateWishes(3)
    }
];

// Функція для генерації випадкових бажань
function generateWishes(count: number): WishType[] {
    const wishes: WishType[] = [];
    for (let i = 1; i <= count; i++) {
        wishes.push({
            title: `Wish ${i}`,
            description: `Description for Wish ${i}`,
            priority: getRandomPriority(),
            links: [`Link ${i}`, `Link ${i + 1}`]
        });
    }
    return wishes;
}

// Функція для випадкового вибору пріоритету
function getRandomPriority(): PriorityType {
    const priorities = Object.values(PriorityType);
    return <PriorityType>priorities[Math.floor(Math.random() * priorities.length)];
}

export default boards;