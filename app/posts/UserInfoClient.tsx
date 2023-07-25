'use client';

import {BiEditAlt, BiTrashAlt} from "react-icons/bi";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import Preloader from "@/components/Preloader";
import {useState} from "react";
import {SafePost} from "@/types";

interface UserInfoClientProps {
    currentPost: SafePost
}
const UserInfoClient: React.FC<UserInfoClientProps> = ({
    currentPost
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            const check = window.confirm('Are you sure?');
            if (!check) return true;

            setIsLoading(true);
            const res: any = await axios.delete(`/api/post/${currentPost.id}`);

            if (res.status == 200) {
                console.log('data ', res.data)
                router.refresh();
                router.push("/");
            }

        } catch (err) {
            console.log('Error from delete a post ', err);
        } finally {
            setIsLoading(false);
        }
    }
    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Preloader /></div>
    }
    return (
        <div className="flex gap-2">
            <Link href={`/write/${currentPost.id}`}>
                <BiEditAlt size={20} color="#3b82f6" className="cursor-pointer"/>
            </Link>

            <BiTrashAlt size={20} color="#e11d48" className="cursor-pointer" onClick={handleDelete}/>
        </div>
    );
};

export default UserInfoClient;