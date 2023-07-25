"use client";

import Container from "@/components/Container";
import {BsChevronDown} from "react-icons/bs";
import Image from "next/image";

const Hero = () => {
    const handleScroll = () => {
        const nextSection = document.getElementById("articles");

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <Container>
            <div className="hero">
                <div className="flex-1 pt-40 padding-x">
                    <h1 className="hero__title">
                        Simply write your content and keep blogging.
                    </h1>
                    <p className="hero__subtitle">
                        T-Blog is a modern text based minimal blog theme created for bloggers that just want to write.
                        It has a unique minimalist design based on beautiful typography which will make your personal website look good with or without images.
                    </p>
                </div>
                <div className="hero__image-container">
                    <div className="hero__image">
                        <Image
                            src="/images/hero.png"
                            alt="hero"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                        />
                    </div>
                    <div className="hero__image-overlay" />
                </div>
            </div>
            <div className="flex justify-center animate-bounce pb-16">
               <BsChevronDown
                   onClick={handleScroll}
                   className="cursor-pointer"
                   size={32}
               />
            </div>
        </Container>
    );
};

export default Hero;