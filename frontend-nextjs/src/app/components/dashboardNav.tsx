"use client"

import Routes from "@/app/routes/routes";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../routes/api";
import Image from "next/image";
import dummyProfile from "@/app/public/images/dummyProfile.png"
import dollarIcon from "@/app/public/images/dollarIcon.png"
import Link from "next/link";
import LogoutButton from "./dashboard/logoutButton";

const DashboardNavbar = () => {
    const Router = useRouter();

    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [showBanance, setShowBalance] = useState("Show Balance");

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null && sessionStorage.getItem("loginId") != "-1") {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                return result.data;
            }
        };

        sessionStorage.getItem("loginId");

        Fetch();
    }, []);

    const ProfileButtonClick = () => {
        if (loggedinData?.role == "user") {
            Router.push(Routes.UserProfile);
        } else if (sessionStorage.getItem("loginId") == "-1" || loggedinData?.role == "admin") {
            Router.push(Routes.AdminProfile);
        }
    }

    const ShowBalanceButtonClick = () => {
        setShowBalance(loggedinData?.balance + " BDT");
        setTimeout(() => {
            setShowBalance("Show Balance");
        }, 5000);
    }

    return (
        <>
            <nav
                className={`sticky w-full top-0 h-14 px-4 duration-300 z-50 backdrop-blur bg-white/50 dark:bg-black/50 border-b border-black/10 dark:border-white/10`}
            >
                <div className="relative w-48 h-14 ">
                    <button
                        className="absolute mt-2 outline outline-zinc-500 w-10 h-10 content-center grid justify-items-center overflow-hidden rounded-full duration-300 hover:scale-110 active:scale-100"
                        type="button"
                        onClick={ProfileButtonClick}
                    >
                        <div>
                        <Image
                            src={dummyProfile}
                            alt="NF"
                            className="bg-white rounded-full"
                        />
                        </div>
                    </button>

                    {
                        (loggedinData?.role == "user") && (
                            <div className=" w-40 absolute left-10 content-center grid justify-items-center">
                                <p className="">
                                    {loggedinData?.userName}
                                </p>
                                <motion.button
                                    type="button"
                                    onClick={ShowBalanceButtonClick}
                                    className="border border-blue-700 p-1 text-sm rounded-full grid grid-cols-5"
                                >
                                    <div className="h-5 w-5 bg-white/100 col-span-1 rounded-full overflow-hidden">
                                        <Image
                                            src={dollarIcon}
                                            alt="NF"
                                            className=""
                                        />
                                    </div>
                                    <p className="col-span-4"> {showBanance} </p>
                                </motion.button>
                            </div>
                        )
                    }
                </div>

                <motion.div className="h-full absolute top-0 right-4">
                    <LogoutButton />
                </motion.div>
            </nav>
        </>
    );
}

export default DashboardNavbar;