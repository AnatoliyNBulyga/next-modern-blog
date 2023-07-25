"use client";

import Button from "@/components/Button";
import Image from "next/image";
import {getShortText} from "@/utils/get-short-text";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {SafePostWithoutAuthor} from "@/types";
import {getText} from "@/utils/get-text";

interface ArticleProps {
    post: SafePostWithoutAuthor
}
const ArticleCard = ({ post }: ArticleProps) => {
    const router = useRouter();
    const [client, setClient] = useState(false);
    const date = useMemo(() => {
      return new Date(post.createdAt).toLocaleDateString("en-US")
    }, [post.createdAt]);

    useEffect(() => {
        setClient(true)
    }, []);

    const getClientText = client && getText;

    return (
        <div
            onClick={() => router.push(`/posts/${post.id}`)}
            className="article group"
        >
            {
                post.img
                ?
                <div className="article__image h-[300px] mb-3" >
                    <Image
                        fill
                        className="
                          object-cover
                          group-hover:scale-105
                          transition
                        "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={post.img}
                        alt="Article's preview"
                    />
                </div>
                : <div className="w-full h-[300px] bg-gray-100 mb-3 flex justify-center items-center rounded-lg">No image</div>
            }

            <div className="px-3">
                <p className="text-sm">Posted at {date}</p>
                <h3 className="xl:text-2xl lg:text-xl font-bold mb-3">{post.title}</h3>
                {
                    getClientText &&
                    <p className="mb-4 min-h-[60px]">
                        {getClientText(getShortText(post.desc))}
                    </p>
                }
            </div>
            <Button
                label="Read more"
                onClick={() => router.push(`/posts/${post.id}`)}
                outline
                additionClasses="border-blue-900 text-blue-900 px-12 mx-3 mb-3"
            />
        </div>
    )
};

export default ArticleCard;