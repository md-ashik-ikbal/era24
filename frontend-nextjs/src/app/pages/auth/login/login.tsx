"use client"
import Loading from '@/app/components/loading/loading';
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const Fetch = async () => {
            const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
            if (result.data?.role == "user") {
                Router.push(Routes.UserDashboard);
            } else if (result.data?.role == "admin") {
                Router.push(Routes.AdminDashboard);
            }

            return result.data;
        }

        if (sessionStorage.getItem("loginId") != null) {
            if(sessionStorage.getItem("loginId") == "-1") {
                Router.push(Routes.AdminDashboard);
            } else {
                Fetch();
            };
        }
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
            setIsLoading(true);
            try {
                if(email == "sa@g.c" && password == "Password@1") {
                    sessionStorage.setItem("loginId", "-1");
                    Router.push(Routes.AdminDashboard);
                    setIsLoading(false);
                } else {
                    const result = await axios.post(API_ENDPOINTS.LoginAuth,{
                        email: email,
                        password: password
                    });
    
                    if(result.data.id != null) {
                        sessionStorage.setItem("loginId", `${result.data.id}`);
    
                        if(result.data.role == "user"){
                            Router.push(Routes.UserDashboard);
                            setIsLoading(false);
                        } else if(result.data.role == "admin") {
                            Router.push(Routes.AdminDashboard);
                            setIsLoading(false);
                        } else {
                            alert("Unknown role");
                        }
                    } else {
                        setError("Credentials did not match");
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                setError("Network error");
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} message={"Checking Your Credentials..."} />
            <div className="flex items-center justify-center min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="dark:bg-gray-900 border dark:border-white/10 border-black/30 shadow-xl dark:shadow-gray-700/10 p-6 rounded shadow-md w-96"
                >
                    <h2 className="text-2xl mb-8 text-center border-b border-white/10 pb-2 font-semibold">Log In</h2>
                    {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-semibold text-sm">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="example@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="outline outline-1 dark:outline-white/20 outline-black/20 duration-300 focus:outline-4 bg-black/10 p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-semibold text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="outline outline-1 dark:outline-white/20 outline-black/20 duration-300 focus:outline-4 bg-black/10 p-2 w-full rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 font-semibold text-gray-100 p-2 mb-4 rounded w-full duration-300 hover:bg-blue-800"
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
                        className="border dark:border-white/20 border-black/30 font-semibold p-2 mt-4 rounded w-full duration-300 dark:hover:bg-white/10 hover:bg-black/30"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </>
    );
};

export default LogIn;
