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
import { SuperAdminDetails } from "../pages/dashboard/admin/profile/adminDetails";

const DashboardNavbar = () => {
    const Router = useRouter();

    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [showBalance, setShowBalance] = useState("Show Balance");
    const [balanceUpdateTrigger, setBalanceUpdateTrigger] = useState(0);

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null && sessionStorage.getItem("loginId") != "-1") {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
            } else if(sessionStorage.getItem("loginId") == "-1") {
                setLoggedinData(SuperAdminDetails);
            }
        };
        
        Fetch();
    }, []);

    const ProfileButtonClick = () => {
        if (loggedinData?.role == "user") {
            Router.push(Routes.UserProfile);
        } else if (sessionStorage.getItem("loginId") == "-1" || loggedinData?.role == "admin") {
            Router.push(Routes.AdminProfile);
        }
    }

    const ShowBalanceButtonClick = async () => {
        const balance = (await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"))).data?.balance;
        setShowBalance(balance + " BDT");

        // setShowBalance(loggedinData?.balance + " BDT");
        setTimeout(() => {
            setShowBalance("Show Balance");
        }, 5000);
    }

    if(loggedinData != null) {
        return (
            <>
                <nav
                    className={`sticky w-full top-0 h-14 px-4 duration-300 z-50 backdrop-blur bg-gray-200/30 dark:bg-gray-950/30 border-b border-black/20 dark:border-white/20`}
                >
                    <div className="relative w-48 h-14 ">
                        <button
                            className="absolute outline outline-blue-500 mt-2 dark:bg-white bg-black w-10 h-10 content-center grid justify-items-center overflow-hidden rounded-full duration-300 hover:scale-110 active:scale-100"
                            type="button"
                            onClick={ProfileButtonClick}
                        >
                            <div className="">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                        </button>
    
                        <div className=" w-40 h-full absolute left-10 content-center grid justify-items-center">
                            <p className="">
                                {loggedinData?.userName}
                            </p>
                            {
                                (loggedinData?.role == "user") && (
                                    <motion.button
                                        type="button"
                                        onClick={ShowBalanceButtonClick}
                                        className="border border-blue-700 p-1 text-sm rounded-full grid grid-cols-5"
                                    >
                                        <div className="h-5 w-5 bg-amber-700 col-span-1 rounded-full overflow-hidden">
                                            <Image
                                                src={dollarIcon}
                                                alt="NF"
                                                className=""
                                            />
                                        </div>
                                        <p className="col-span-4"> {showBalance} </p>
                                    </motion.button>
                                )
                            }
                        </div>
                    </div>
    
                    <motion.div className="h-14 w-14 scale-75 absolute top-0 right-0">
                        <LogoutButton />
                    </motion.div>
                </nav>
            </>
        );
    }
}

export default DashboardNavbar;