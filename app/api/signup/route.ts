import {database} from "@/lib/db";
import {NextResponse} from "next/server";
import {generateVerificationToken} from "@/lib/token";
import bcrypt from "bcryptjs";

export async function POST(
    req: Request,
) {
    try {
        const { email, password, firstName, lastName, birthday } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await database.user.findUnique({ where: { email } });

        if (user) {
            return new NextResponse("Email already exists!", { status: 403 });
        }

        const newUser = await database.user.create({
            data: {
                firstName, lastName, email, birthday,
                password: hashedPassword,
            },
        });

        const verificationToken = await generateVerificationToken(email);

        return NextResponse.json(newUser);
    } catch (error) {
        console.log("[SIGN UP]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}