import NextAuth from "next-auth";
import {database} from "@/lib/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import {UserType} from "@/lib/type";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error",
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.email = token.email;
                session.user.password = token.password;
                session.user.birthday = token.birthday;
                session.user.isPrivate = token.isPrivate;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await database.user.findUnique({ where: { id: token.sub } }) as UserType;

            if (!existingUser) return token;

            token.firstName = existingUser.firstName;
            token.lastName = existingUser.lastName;
            token.email = existingUser.email;
            token.id = existingUser.id;
            token.password = existingUser.password;
            token.birthday = existingUser.birthday;
            token.isPrivate = existingUser.isPrivate;

            return token;
        }
    },
    adapter: PrismaAdapter(database),
    session: { strategy: "jwt" },
    ...authConfig,
});