import {database} from "@/lib/db";
import {v4 as uuidv4} from 'uuid';
import {TokenType} from "@/lib/type";
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await database.verificationToken.findFirst({
        where: { email }
    }) as TokenType;

    if (existingToken) {
        await database.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    return database.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
};