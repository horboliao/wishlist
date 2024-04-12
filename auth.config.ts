import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {database} from "@/lib/db";
import * as z from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await database.user.findUnique({where: {email}})
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig