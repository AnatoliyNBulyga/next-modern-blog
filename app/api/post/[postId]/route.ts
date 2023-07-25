import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
    postId?: string;
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { postId } = params;

    if (!postId) {
        throw new Error('Invalid ID');
    }

    const body = await request.json();
    const {
        title,
        desc,
        img,
        cat
    } = body;

    Object.keys(body).forEach((value: string) => {
        if (!body[value]) {
            NextResponse.error()
        }
    });

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
            authorId: currentUser.id
        },
        data: {
            title,
            desc,
            img,
            cat
        }
    })

    return NextResponse.json(updatedPost);
}
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { postId } = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
    }

    const deletedPost = await prisma.post.deleteMany({
        where: {
            id: postId,
            authorId: currentUser.id
        }
    });

    return NextResponse.json(deletedPost);
}