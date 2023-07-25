import getCurrentUser from "@/actions/getCurrentUser";
import getPostById from "@/actions/getPostById";
import WritePageClient from "@/app/write/[pageId]/WritePageClient";
import {SafeUser} from "@/types";


interface IParams {
    pageId?: string;
}
const SingleWritePage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const currentPost = await getPostById(params);

    return (
        <WritePageClient
            currentPost={currentPost}
            currentUser={currentUser}
        />
    );
};

export default SingleWritePage;