import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import {SafeUser} from "@/types";

export async function getSession() {
    return await getServerSession(authOptions as any);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
    try {
        const session: any = await getSession();

        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            hashedPassword: 'secure',
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt?.toISOString() || null,
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch(error: any) {
        return null;
    }
}