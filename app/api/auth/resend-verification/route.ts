import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { sendVerificationEmail } from "@/lib/nodemailer"; 

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            return NextResponse.json({ message: "If an account exists, a new verification code has been sent." }, { status: 200 });
        }

        await prisma.verificationToken.deleteMany({
            where: { identifier: email },
        });

        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 1000 * 60 * 5);

        await prisma.verificationToken.create({
            data: { identifier: email, token, expires },
        });

        sendVerificationEmail(email, token).catch(error => {
            console.error("Failed to resend verification email:", error);
        });

        return NextResponse.json({ message: "New verification code sent successfully." }, { status: 200 });

    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}