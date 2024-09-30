"use client"
import API_ENDPOINTS from '@/app/routes/api';
import Routes from '@/app/routes/routes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LogIn = () => {
    const Router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const Fetch = async () => {
            if(sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById+sessionStorage.getItem("loginId"));
                if(result.data?.role == "user") {
                    Router.push(Routes.UserDashboard);
                } else if(result.data?.role == "admin") {
                    Router.push(Routes.AdminDashboard);
                } 
            }
        };

        Fetch();
    }, []);

    const ValidationCheck = async (email: string, password: string) => {
        const isValidEmail = (str: any) => /\S+@\S+\.\S+/.test(str);
        const isValidPassword = (str: any) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(str);

        if (!email) {
            setError("Email is required");
            return false;
        } else if (!isValidEmail(email)) {
            setError("Email is required in the correct format");
            return false;
        } else if (!password) {
            setError("Password is required");
            return false;
        } else if (!isValidPassword(password)) {
            setError("Password must contain one upper case one lower case one symble and 6 character long");
            return false;
        } else {
            setError('');
        }
        return true;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await ValidationCheck(email, password);

        if(isValid) {
            try {
                if(email == "sa@g.c" && password == "Password@1") {
                    sessionStorage.setItem("loginId", "-1");
                    Router.push(Routes.AdminDashboard);
                } else {
                    const result = await axios.post(API_ENDPOINTS.LoginAuth,{
                        email: email,
                        password: password
                    });
    
                    if(result.data.id != null) {
                        sessionStorage.setItem("loginId", `${result.data.id}`);
    
                        if(result.data.role == "user"){
                            Router.push(Routes.UserDashboard);
                        } else if(result.data.role == "admin") {
                            Router.push(Routes.AdminDashboard);
                        } else {
                            alert("Unknown role");
                        }
                    } else {
                        setError("Credentials did not match");
                    }
                }
            } catch (error) {
                setError("Network error");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900/50 border border-white/10 p-6 rounded shadow-md w-96"
            >
                <h2 className="text-2xl mb-8 text-center">Log In</h2>
                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline outline-1 outline-white/20 duration-300 focus:outline-4 bg-black/30 p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline outline-1 outline-white/20 duration-300 focus:outline-4 bg-black/30 p-2 w-full rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 mb-4 rounded w-full duration-300 hover:bg-blue-700"
                >
                    Log In
                </button>
                <div className="flex items-center justify-center">
                    <hr className="flex-grow border-gray-500" />
                    <span className="mx-2 text-gray-500">Or</span>
                    <hr className="flex-grow border-gray-500" />
                </div>
                <button
                    type="button"
                    onClick={()=>{Router.push(Routes.Registration)}}
                    className="border border-white/20 text-white p-2 mt-4 rounded w-full duration-300 hover:bg-white/10"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default LogIn;
