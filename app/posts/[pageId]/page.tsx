import getPostById from "@/actions/getPostById";
import Image from "next/image";
import Content from "@/components/Content";
import moment from "moment";
import getCurrentUser from "@/actions/getCurrentUser";
import Avatar from "@/components/Avatar";
import UserInfoClient from "@/app/posts/UserInfoClient";
import Sidebar from "@/components/sidebar/Sidebar";
import getPosts from "@/actions/getPosts";

interface IParams {
    pageId?: string;
}

const SinglePage = async ({ params }: { params: IParams }) => {

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();
    const allPosts = await getPosts();

    if (!post) {
        return "We have no posts with the Id"
    }

    return (
        <div className="container pt-40 flex gap-10">
            <div className="flex-1 content mb-8">
                {
                    post.img
                    ?
                    <div className="relative h-[450px] mb-3">
                        <Image
                            className="object-contain"
                            src={post.img}
                            alt="Article's preview"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    : <div className="w-full h-[450px] bg-gray-100 mb-3 flex justify-center items-center rounded-lg">No image</div>
                }
                <div className="flex my-8 gap-6">
                    <div className="flex">
                        <div className="mr-2">
                            <Avatar src={post.author.image} />
                        </div>
                        <div>
                            <span className="font-normal">{post.author.name}</span>
                            <p>Posted {moment(post.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    {
                        (currentUser?.name === post.author.name)
                        &&
                        <UserInfoClient currentPost={post} />
                    }
                </div>

                <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
                <Content text={post.desc} />
            </div>
            <div className="w-[300px] max-lg:hidden">
                <Sidebar posts={allPosts} currentPost={post} />
            </div>

        </div>
    );
};

export default SinglePage;