"use client"

import BackButton from "@/app/components/backButton/backButton";
import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import historyIcon from "@/app/public/images/history.png"
import hideActionIcon from "@/app/public/images/hideAction.png"
import Toast from "@/app/components/toast/toast";
import { AnimatePresence, motion } from "framer-motion";

type FormData = {
    currentPassword: string;
    newPassword: string;
    rePassword: string;
}

const UserProfile = () => {
    const Router = useRouter();

    const { register, getValues, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [toast, setToast] = useState({
        isShow: false,
        message: "",
        bgColor: ""
    });
    const [loginId, setLoginId] = useState<any>(null);
    const [isSwPassCng, setIsSwPasscng] = useState(false);

    useEffect(() => {
        const URLProtect = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoginId(result.data);
                if (result.data?.role != "user") {
                    Router.push(Routes.LogIn);
                }
                return result.data;
            } else {
                Router.push(Routes.LogIn);
            }
        };

        URLProtect();
    }, []);

    useEffect(() => {
        if (toast.isShow) {
            setTimeout(() => {
                setToast({
                    ...toast,
                    isShow: false
                })
            }, 5000);
        }
    }, [toast.isShow]);

    const onSubmit = async (data: any) => {
        try {
            const { rePassword, ...sendData } = data;
            const response = await axios.patch(API_ENDPOINTS.ChangePassword + loginId.id, {
                ...sendData
            });
            console.log(data);

            setToast({
                isShow: true,
                message: response.data,
                bgColor: (response.data == "Password changed") ? "blue" : "red"
            });
        } catch (error) {
            console.log(error)
        }
    }

    if (loginId != null) {
        return (
            <>
                <Toast isShow={toast.isShow} message={toast.message} bgColor={toast.bgColor} />
                <div className="">
                    <div className="border border-black/30 dark:border-white/20 rounded my-4 relative w-[90%] left-[5%] md:w-1/2 md:left-[25%] flex flex-col items-center justify-center ">
                        <div className="w-full p-2 grid grid-cols-3 border-b dark:border-white/20 border-black/30 mb-8">
                            <div className='w-10 h-10 col-span-1 rounded overflow-hidden'>
                                <BackButton />
                            </div>
                            <h2 className="col-span-1 text-2xl font-bold text-center pb-2">My Profile</h2>
                            <div className="w-full h-full col-span-1">
                                <button type="button" className="w-10 h-10 rounded absolute right-2 top-2 border dark:border-white/20 border-black/30 duration-300 dark:hover:bg-white/20 hover:bg-black/30">
                                    <Image
                                        src={historyIcon}
                                        alt="NF"
                                        className="scale-75"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h1> Name: {loginId.userName} </h1>
                            <h1> Role: {loginId.role} </h1>
                            <h1> Phone: {loginId.phone} </h1>
                            <h1> Email: {loginId.email} </h1>
                            <h1> Balance: {loginId.balance} </h1>
                            <button
                                type="button"
                                onClick={() => { setIsSwPasscng(true) }}
                                className="border border-violet-700 duration-300 hover:bg-violet-700 w-full px-4 py-2 mt-8 rounded"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {
                        (isSwPassCng) && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    backdropFilter: "blur(0)",
                                    scale: 1.2
                                }}
                                animate={{
                                    opacity: 1,
                                    backdropFilter: "blur(50px)",
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    backdropFilter: "blur(0)",
                                    scale: 1.2
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                                className="border border-black/30 dark:border-white/20 rounded absolute rounded mt-4 w-[90%] left-[5%] top-14 md:w-[50%] md:left-[25%]"
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative  flex flex-col items-center justify-center ">
                                        <div className="w-full p-2 grid grid-cols-1 border-b dark:border-white/20 border-black/30 mb-8">

                                            <h2 className="col-span-1 text-xl font-bold text-center pb-2">Change Password</h2>
                                            <div className="w-full h-full col-span-0">
                                                <button
                                                    type="button"
                                                    onClick={() => { setIsSwPasscng(false) }}
                                                    className="w-10 h-10 rounded absolute right-2 top-2 border dark:border-white/20 border-black/30 duration-300 dark:hover:bg-white/20 hover:bg-black/30">
                                                    <Image
                                                        src={hideActionIcon}
                                                        alt="NF"
                                                        className="scale-75"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-300">Current Password</label>
                                            <input
                                                type="text"
                                                {...register('currentPassword', {
                                                    required: 'Password is required',
                                                    pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/, message: "Password is required in valid formate" }
                                                })}
                                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.currentPassword ? 'outline-pink-700' : 'outline-white/20'}`}
                                            />
                                            {errors.currentPassword && <p className="text-pink-700 font-semibold text-sm">{errors.currentPassword.message}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-300">New Password</label>
                                            <input
                                                type="text"
                                                {...register('newPassword', {
                                                    required: 'Password is required',
                                                    pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/, message: "Password is required in valid formate" }
                                                })}
                                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.newPassword ? 'outline-pink-700' : 'outline-white/20'}`}
                                            />
                                            {errors.newPassword && <p className="text-pink-700 font-semibold text-sm">{errors.newPassword.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-300">Retype new Password</label>
                                            <input
                                                type="text"
                                                {...register('rePassword', {
                                                    required: 'Password is required',
                                                    validate: (value) => {
                                                        const getPassword = getValues("currentPassword");
                                                        return value == getPassword || "Password did not match"
                                                    }
                                                })}
                                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.rePassword ? 'outline-pink-700' : 'outline-white/20'}`}
                                            />
                                            {errors.rePassword && <p className="text-pink-700 font-semibold text-sm">{errors.rePassword.message}</p>}
                                        </div>
                                    </div>
                                    <div className="relative overflow-hidden my-4 w-[90%] left-[5%] md:w-1/2 md:left-[25%] border border-black/30 dark:border-white/20 rounded">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 w-full duration-300 hover:bg-white/20"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </>
        );
    }
}

export default UserProfile;