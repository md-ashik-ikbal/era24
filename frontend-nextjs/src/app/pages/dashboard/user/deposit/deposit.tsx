"use client"

import { useRouter } from 'next/navigation';
import Routes from '@/app/routes/routes';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API_ENDPOINTS from '@/app/routes/api';
import BackButton from '@/app/components/backButton/backButton';
import Loading from '@/app/components/loading/loading';

type FormData = {
    paymentMethod: string;
    amount: string;
    transactionId: string;
    message: string;
};

const Deposit = () => {
    const Router = useRouter();
    const [success, setSuccess] = useState("");
    const { register, getValues, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const isEmailExist = await axios.get(API_ENDPOINTS.IsEmailExist+data.email);
            
            if (isEmailExist.data) {
                alert("This email is already registered.");
                setIsLoading(false);
            } else {
                const result = await axios.post(API_ENDPOINTS.Register, {
                    role: "user",
                    userName: data.userName,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                    balance: 0
                });

                setSuccess("Registration Success. Now you can Log In");
                setIsLoading(false);
            }
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        
    };

    return (
        <>
            <Loading isLoading={isLoading} message={"Loading..."} />
            <div className="flex items-center justify-center min-h-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-800/50 p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <div className="w-md grid grid-cols-9 border-b border-white/20 pb-4 mb-8">
                        <div className='w-10 h-10 col-span-1 absolute  rounded-full overflow-hidden'>
                            <BackButton />
                        </div>
                        <h2 className="col-span-8 text-2xl font-bold text-center pb-4">Deposit</h2>
                    </div>
                    {success && <p className="text-blue-700 text-center mb-4 font-semibold text-sm">{success}</p>}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            {...register('paymentMethod', {
                                required: 'Payment Method is required',
                                minLength: { value: 3, message: "Username required to be grather than 3 characters" }
                            })}
                            className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.paymentMethod ? 'outline-pink-700' : 'outline-white/20'}`}
                        />
                        {errors.paymentMethod && <p className="text-pink-700 font-semibold text-sm">{errors.paymentMethod.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                        <input
                            type="text"
                            {...register('amount', {
                                required: 'Amount is required',
                                min: { value: 500, message: "Minimum deposit 500 BDT" }
                            })}

                            className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.amount ? 'outline-pink-700' : 'outline-white/20'}`}
                        />
                        {errors.amount && <p className="text-pink-700 font-semibold text-sm">{errors.amount.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="text"
                            {...register('transactionId', {
                                required: 'Transaction Id is required',
                            })}
                            className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.transactionId ? 'outline-pink-700' : 'outline-white/20'}`}
                        />
                        {errors.transactionId && <p className="text-pink-700 font-semibold text-sm">{errors.transactionId.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="text"
                            {...register('message', {
                                required: 'Password is required',
                            })}
                            className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.message ? 'outline-pink-700' : 'outline-white/20'}`}
                        />
                        {errors.message && <p className="text-pink-700 font-semibold text-sm">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 mb-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Request Deposit
                    </button>
                </form>
            </div>
        </>
    );
};

export default Deposit;

