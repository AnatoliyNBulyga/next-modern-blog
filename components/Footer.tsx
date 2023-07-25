"use client";

import Container from "@/components/Container";
import { CiTwitter, CiYoutube, CiFacebook } from "react-icons/ci";

const Footer = () => {
    return (
        <div
            className="
                w-full
                bg-white
                shadow-sm
                py-4
                border-t-[1px]
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
                    <div className="font-bold text-xl">T-Blog</div>

                    <div className="flex justify-between items-center">
                        <div className="px-2"><a href="#"><CiTwitter size={20} /></a></div>
                        <div className="px-2"><a href="#"><CiYoutube size={20}/></a></div>
                        <div className="px-2"><a href="#"><CiFacebook size={20}/></a></div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;