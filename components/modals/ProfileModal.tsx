"use client";

import {useState} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { useRouter } from "next/navigation";
import useProfileModal from "@/hooks/useProfileModal";
import ImageUpload from "@/components/inputs/ImageUpload";
import axios from "axios";
import {SafeUser} from "@/types";
import {toast} from "react-hot-toast";

interface ProfileModalProps {
    currentUser?: SafeUser | null;
}
const ProfileModal: React.FC<ProfileModalProps> = ({ currentUser }) => {

    const router = useRouter();

    const profileModal = useProfileModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            image: currentUser?.image
        }
    });
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const image = watch('image', currentUser?.image);
    const email = watch('email', currentUser?.email);
    const name = watch('name', currentUser?.name);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log('data ', data);

        axios.put(`/api/user/${currentUser?.id}`, data)
            .then(() => {
                toast.success('Your profile was updated!');
                router.refresh();
                profileModal.onClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something is wrong!")
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Profile"
                subtitle="Update your profile!"
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                value={name}
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                value={email}
            />
            <ImageUpload
                value={image}
                onChange={(value: string) => setCustomValue("image", value)}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={profileModal.isOpen}
            title="Profile"
            actionLabel="Update"
            onClose={profileModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default ProfileModal;