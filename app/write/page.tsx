"use client";

import { useState } from 'react';
import Button from "@/components/Button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/components/inputs/Input";
import Container from "@/components/Container";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/navigation";
import ImageUpload from "@/components/inputs/ImageUpload";
import Preloader from "@/components/Preloader";
import {categoryArray} from "@/contstants";

const WritePage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [cat, setCat] = useState('art');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            desc: '',
            cat: '',
            img: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.cat = cat;

        setIsLoading(true);

        axios.post('/api/post', data)
            .then(() => {
                toast.success('Post was created!');
                window.setTimeout(() => {
                    router.refresh();
                    router.push("/");
                }, 2000)
            })
            .catch(() => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const img = watch('img');
    const desc = watch('desc');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Preloader /></div>
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className="py-40 flex gap-8 max-md:flex-col">
                <div className="flex-1">
                    <div className="mb-8">
                        <Input
                            id="title"
                            label="Title"
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <ReactQuill
                            className="editor min-h-[45vh] overflow-scroll border-solid border-[1px] border-[#ccc]"
                            theme="snow"
                            value={desc}
                            onChange={(value: string) => setCustomValue("desc", value)}
                        />
                    </div>
                </div>

                <div className="xs:w-[320px]">
                    <div className="mb-8">
                        <label
                            className="block mb-2 font-normal text-gray-900 dark:text-white"
                            htmlFor="file_input"
                        >
                            Upload file
                        </label>
                        <ImageUpload
                            value={img}
                            onChange={(value: string) => setCustomValue("img", value)}
                        />
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 font-normal text-gray-900">Category</h3>
                        <ul className="w-full text-sm text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {
                                categoryArray.map(category =>

                                    <li
                                        key={category}
                                        className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                                    >
                                        <div className="flex items-center pl-3">
                                            <input
                                                checked={cat === category}
                                                id={category}
                                                type="radio"
                                                value={category}
                                                name={category}
                                                className="
                                                    w-4
                                                    h-4
                                                    text-blue-600
                                                    bg-gray-100
                                                    border-gray-300
                                                    dark:focus:ring-blue-600
                                                    dark:ring-offset-gray-700
                                                    dark:focus:ring-offset-gray-700
                                                    dark:bg-gray-600
                                                    dark:border-gray-500
                                                "
                                                onChange={(e) => setCat(e.target.value)}
                                            />
                                            <label
                                                htmlFor={category}
                                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                                            >
                                                {category}
                                            </label>
                                        </div>
                                    </li>
                                )}
                        </ul>
                    </div>

                    <Button
                        label="Publish"
                        type="submit"
                        additionClasses="text-blue-900 px-12 w-full"
                    />
                </div>

            </form>
        </Container>
    );
};

export default WritePage;