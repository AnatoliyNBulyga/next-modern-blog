import {NextResponse} from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
    userId?: string;
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    const { userId } = params;
    if (!userId) {
        return NextResponse.error();
    }
    const body = await request.json();

    const {
        name,
        email,
        image
    } = body;


    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...body
        }
    });

    return NextResponse.json(updatedUser);

}