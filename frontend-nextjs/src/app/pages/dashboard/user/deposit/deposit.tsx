"use client"

import { useRouter } from 'next/navigation';
import Routes from '@/app/routes/routes';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API_ENDPOINTS from '@/app/routes/api';
import BackButton from '@/app/components/backButton/backButton';
import Loading from '@/app/components/loading/loading';
import CustomRadio from '@/app/components/radio/radio';

interface FormData {
    selectedOption: string;
    input1: string;
    input2: string;
    input3: string;
}

const Deposit = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            {/* <Loading isLoading={isLoading} message={"Loading..."} /> */}
            <div className="min-h-[calc(90vh)] flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white/20 p-6 rounded shadow-md w-1/3">
                    <h2 className="text-lg font-bold mb-4">Custom Radio Form</h2>

                    <div className="mb-4">
                        <CustomRadio id="option1" label="Option 1" register={register} value="option1" />
                        <CustomRadio id="option2" label="Option 2" register={register} value="option2" />
                        <CustomRadio id="option3" label="Option 3" register={register} value="option3" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="input1" className="block text-sm mb-1">Input 1</label>
                        <input
                            type="text"
                            id="input1"
                            {...register('input1', { required: true })}
                            className={`border p-2 w-full ${errors.input1 ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.input1 && <span className="text-red-500 text-xs">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="input2" className="block text-sm mb-1">Input 2</label>
                        <input
                            type="text"
                            id="input2"
                            {...register('input2', { required: true })}
                            className={`border p-2 w-full ${errors.input2 ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.input2 && <span className="text-red-500 text-xs">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="input3" className="block text-sm mb-1">Input 3</label>
                        <input
                            type="text"
                            id="input3"
                            {...register('input3', { required: true })}
                            className={`border p-2 w-full ${errors.input3 ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.input3 && <span className="text-red-500 text-xs">This field is required</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Deposit;

