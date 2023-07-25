import prisma from "@/libs/prismadb";
import {SafePost} from "@/types";
interface IParams {
    pageId?: string
}
export default async function getPostById(
    params: IParams
): Promise<SafePost | null> {
    try {
        const { pageId } = params;

        const postData = await prisma.post.findUnique({
            where: {
                id: pageId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            },
        })

        if (!postData) {
            return null;
        }

        const safePostData = {
            ...postData,
            createdAt: postData.createdAt.toISOString(),
            updatedAt: postData.updatedAt?.toISOString() || null
        }
        return safePostData;

    } catch(error: any) {
        throw new Error(error);
    }
}