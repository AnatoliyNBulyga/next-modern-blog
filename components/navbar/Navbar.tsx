"use client";

import Container from "@/components/Container";
import UserMenu from "@/components/navbar/UserMenu";
import Link from "next/link";
import {useMemo, useState} from "react";
import {SafePost, SafePostWithoutAuthor, SafeUser} from "@/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
    posts?: SafePostWithoutAuthor[] | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, posts }) => {

    const [active, setActive] = useState<string>('all');
    const categories = posts && posts.map((post: SafePostWithoutAuthor) => post.cat);
    const uniqueCatItems: string[] = useMemo(() => {
        return Array.from(new Set(categories));
    }, [posts]);

    return (
        <div className="fixed w-full bg-white z-20 shadow-sm">
            <div
                className="
                    py-4
                    border-b-[1px]
                "
            >
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        "
                    >
                        <Link href="/" className="font-bold text-xl" >T-Blog</Link>

                        {
                            uniqueCatItems
                            &&
                            <div className="flex flex-row justify-center text-sm max-md:hidden">
                                {
                                    ['all', ...uniqueCatItems].map((category: string) => {
                                        return (
                                            <Link
                                                href={category == 'all' ? '/' : `/?cat=${category}`}
                                                scroll={false}
                                                key={category}
                                                className={`
                                                    mx-1
                                                    py-2 
                                                    px-4
                                                    hover:shadow-md
                                                    rounded-full 
                                                    cursor-pointer 
                                                    uppercase 
                                                    ${active === category && "shadow-md"}
                                                `}
                                                onClick={(event) => setActive(category)}
                                            >
                                                {category}
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                        }



                        <div>
                            <UserMenu currentUser={currentUser} menuItems={uniqueCatItems} />
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;