import getCurrentUser from "@/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
       title,
       desc,
       cat,
       img
    } = body;

    console.log('body ', body)

    if (!title || !desc || !cat) {
        return NextResponse.error();
    }

    const createPost = await prisma.post.create({
        data: {
            title,
            desc,
            cat,
            img: img ? img : null,
            authorId: currentUser.id
        }
    });

    return NextResponse.json(createPost);
}