import prisma from "@/libs/prismadb";
import {SafePost, SafePostWithoutAuthor} from "@/types";

interface IParams {
    cat?: string
}

export default async function getPosts(
    params: IParams = { cat: '' }
): Promise<SafePostWithoutAuthor[] | null> {
    try {

        const { cat } = params;

        const posts = cat
            ? await prisma.post.findMany({
                where: {
                    cat
                }
            })
            : await prisma.post.findMany();

        if (!posts) {
            return null;
        }

        const safePosts = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt?.toISOString() || null,
        }));

        return safePosts;
    } catch(error: any) {
        return null;
    }
}