"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import bkashLogo from "@/app/public/images/bkash.png";
import nagadLogo from "@/app/public/images/nagad.png"
import rocketLogo from "@/app/public/images/rocket.png"
import Image from "next/image";
import BackButton from "@/app/components/backButton/backButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import Routes from "@/app/routes/routes";

type FormData = {
    phone: "",
    amount: "",
    transactionId: "",
    paymentMethod: "bkash" | "nagad" | "rocket";
};

const Deposit = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [loginId, setLoginId] = useState<any>(null);
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };
    const selectedValue = watch("paymentMethod");

    useEffect(() => {
        setLoginId(sessionStorage.getItem("loginId"));
    }, [loginId]);

    if (loginId != null){
        return(
        <>
            <div className=" relative">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border border-black/30 dark:border-white/20 rounded my-4 relative w-[90%] left-[5%] md:w-1/2 md:left-[25%] flex flex-col items-center justify-center ">
                        <div className="w-full p-2 grid grid-cols-9 border-b border-white/20  mb-8">
                            <div className='w-10 h-10 col-span-1 absolute  rounded-full overflow-hidden'>
                                <BackButton />
                            </div>
                            <h2 className="col-span-8 text-2xl font-bold text-center pb-2">Deposit</h2>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                            <input
                                type="text"
                                placeholder="01XXXXXXXXX"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    minLength: { value: 11, message: "Phone has to be 11 characters long" },
                                    maxLength: { value: 11, message: "Phone couldn't be exceeded 11 characters" }
                                })}

                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.phone ? 'outline-pink-700' : 'outline-white/20'}`}
                            />
                            {errors.phone && <p className="text-pink-700 font-semibold text-sm">{errors.phone.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Amount</label>
                            <input
                                type="text"
                                placeholder="XXX"
                                {...register('amount', {
                                    required: 'Amount is required',
                                    min: { value: 500, message: "Minimum deposit 500" }
                                })}
                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.amount ? 'outline-pink-700' : 'outline-white/20'}`}
                            />
                            {errors.amount && <p className="text-pink-700 font-semibold text-sm">{errors.amount.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Transaction ID</label>
                            <input
                                type="text"
                                placeholder="XXXXXXXXX"
                                {...register('transactionId', {
                                    required: 'Transaction id is required',
                                })}
                                className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.transactionId ? 'outline-pink-700' : 'outline-white/20'}`}
                            />
                            {errors.transactionId && <p className="text-pink-700 font-semibold text-sm">{errors.transactionId.message}</p>}
                        </div>
                    </div>
                    <div className=" relative w-[90%] left-[5%] md:w-1/2 md:left-[25%] border border-black/30 dark:border-white/20 rounded">
                        <h1 className="text-center text-xl p-2 font-semibold border-b border-black/30 dark:border-white/20">Choose An Option</h1>
                        <div className="relative  p-4 justify-items-center grid grid-cols-3 gap-4">
                            <label
                                className={`p-2 px-4 w-28 grid col-span-1 cursor-pointer rounded dark:bg-white/20 bg-black/30 transition duration-300 ${selectedValue === "bkash"
                                    ? "outline outline-4 outline-pink-700"
                                    : "outline-0"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="bkash"
                                    {...register("paymentMethod")}
                                    className="hidden"
                                />
                                <Image
                                    src={bkashLogo}
                                    alt="NF"
                                />
                                <p className="text-center font-semibold bg-black/30 rounded mt-2">Bkash</p>
                            </label>

                            <label
                                className={`p-2 px-4 w-28 grid col-span-1 cursor-pointer rounded dark:bg-white/20 bg-black/30 transition duration-300 ${selectedValue === "nagad"
                                    ? "outline outline-4 outline-orange-700"
                                    : "outline-0"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="nagad"
                                    {...register("paymentMethod")}
                                    className="hidden"
                                />
                                <Image
                                    src={nagadLogo}
                                    alt="NF"
                                    className="rounded"
                                />
                                <p className="text-center font-semibold bg-black/30 rounded mt-2">Nagad</p>
                            </label>

                            <label
                                className={`p-2 px-4 w-28 grid col-span-1 cursor-pointer rounded dark:bg-white/20 bg-black/30 transition duration-300 ${selectedValue === "rocket"
                                    ? "outline outline-4 outline-fuchsia-700"
                                    : "outline-0"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="rocket"
                                    {...register("paymentMethod")}
                                    className="hidden"
                                />
                                <div className="bg-gray-900 dark:bg-gray-200 h-[80px] rounded p-2">
                                    <Image
                                        src={rocketLogo}
                                        alt="NF"
                                        className="mt-2"
                                    />
                                </div>
                                <p className="text-center font-semibold bg-black/30 rounded mt-2">Rocket</p>
                            </label>
                        </div>
                    </div>
                    <div className="relative overflow-hidden mt-4 w-[90%] left-[5%] md:w-1/2 md:left-[25%] border border-black/30 dark:border-white/20 rounded">
                        <button
                            type="submit"
                            className="px-6 py-2 w-full duration-300 hover:bg-white/20"
                        >
                            Deposit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
} else {
    return(
        <>
            <h1>
                You must <Link href={Routes.LogIn}> Log In </Link> first to make a deposit.
            </h1>
        </>
    );
}
}

export default Deposit;