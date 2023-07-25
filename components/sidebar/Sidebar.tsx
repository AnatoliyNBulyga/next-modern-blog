"use client";

import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useMemo} from "react";
import {SafePostWithoutAuthor, SafePost} from "@/types";

interface SidebarProps {
    currentPost: SafePost;
    posts?: SafePostWithoutAuthor[] | null;
}
const Sidebar: React.FC<SidebarProps> = ({ currentPost, posts }) => {
    const router = useRouter();

    const relatedPosts = useMemo(() => posts && posts.filter((post) => post.id !== currentPost.id && post.cat === currentPost.cat), [posts]);

    return (
        <div>
            <h3 className="font-normal mb-3">Other posts you might like</h3>
            {
                relatedPosts && relatedPosts.length > 0
                    ?
                    relatedPosts.map((post: SafePostWithoutAuthor) => (
                        <div key={post.id} className="flex flex-col mb-4">
                            {
                                post.img
                                ?
                                <div className="relative lg:w-full w-[90%] aspect-square overflow-hidden" >
                                    <Image
                                        fill
                                        className="
                                          object-cover
                                          h-full
                                          w-full
                                          group-hover:scale-105
                                          transition
                                        "
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={post.img}
                                        alt="Article's preview"
                                    />
                                </div>
                                : <div className="w-full h-[250px] bg-gray-100 mb-3 flex justify-center items-center rounded-lg">No image</div>
                            }
                            <h3 className="font-normal mb-2">{post.title}</h3>
                            <Button
                                label="Read more"
                                onClick={() => router.push(`/posts/${post.id}`)}
                                outline
                                additionClasses="border-blue-900 text-blue-900 px-12 mb-3"
                            />
                        </div>
                    ))
                    : <p className="text-sm">You have no related posts</p>
            }
        </div>
    );
};

export default Sidebar;