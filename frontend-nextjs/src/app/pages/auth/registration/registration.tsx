"use client"

import { useRouter } from 'next/navigation';
import Routes from '@/app/routes/routes';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API_ENDPOINTS from '@/app/routes/api';

type FormData = {
    userName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Registration: React.FC = () => {
    const Router = useRouter();
    const [success, setSuccess] = useState("");
    const { register, getValues, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: any) => {
        try {
            const isEmailExist = await axios.get(API_ENDPOINTS.IsEmailExist+data.email);
            
            if (isEmailExist.data) {
                alert("This email is already registered.");
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
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800/50 p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center border-b border-white/20 pb-4">Register</h2>
                {success && <p className="text-blue-700 text-center mb-4 font-semibold text-sm">{success}</p>}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        {...register('userName', {
                            required: 'Username is required',
                            minLength: { value: 3, message: "Username required to be grather than 3 characters" }
                        })}
                        className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.userName ? 'outline-pink-700' : 'outline-white/20'}`}
                    />
                    {errors.userName && <p className="text-pink-700 font-semibold text-sm">{errors.userName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                    <input
                        type="text"
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
                    <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /\S+@\S+\.\S+/, message: 'Email is required in valid formate' }
                        })}
                        className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.email ? 'outline-pink-700' : 'outline-white/20'}`}
                    />
                    {errors.email && <p className="text-pink-700 font-semibold text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/, message: "Password is required in valid formate" }
                        })}
                        className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.password ? 'outline-pink-700' : 'outline-white/20'}`}
                    />
                    {errors.password && <p className="text-pink-700 font-semibold text-sm">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Password is required',
                            validate: (value) => {
                                const getPassword = getValues("password");
                                return value == getPassword || "Password do not match"
                            }
                        })}
                        className={`bg-transparent outline outline-2  duration-300 focus:outline-4 p-2 mb-1 w-full rounded ${errors.confirmPassword ? 'outline-pink-700' : 'outline-white/20'}`}
                    />
                    {errors.confirmPassword && <p className="text-pink-700 font-semibold text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 mb-2 rounded-md hover:bg-blue-600 transition"
                >
                    Register
                </button>
                <div className="flex items-center justify-center">
                    <hr className="flex-grow border-gray-500" />
                    <span className="mx-2 text-gray-500">Or</span>
                    <hr className="flex-grow border-gray-500" />
                </div>
                <button
                    type="button"
                    onClick={() => { Router.push(Routes.LogIn) }}
                    className="border border-white/20 text-white p-2 mt-2 rounded w-full duration-300 hover:bg-white/10"
                >
                    Log In Here
                </button>
            </form>
        </div>
    );
};

export default Registration;

