import { User, Post } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string | null;
    emailVerified: string | null;
}

type Author = {
    id: string;
    name: string | null;
    image: string | null;
}

export type SafePost = Omit<
    Post,
    "createdAt" | "updatedAt" | "author"
> & {
    createdAt: string;
    updatedAt: string | null;
    author: Author
}

export type SafePostWithoutAuthor = Omit<SafePost, "author">