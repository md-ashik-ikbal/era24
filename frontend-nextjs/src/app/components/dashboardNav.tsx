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

const DashboardNavbar = () => {
    const Router = useRouter();

    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [showBanance, setShowBalance] = useState("Show Balance");

    useEffect(() => {
        const Fetch = async () => {
            if(sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById+sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                if(result.data?.role != "user") {
                    Router.push(Routes.LogIn);
                }
                return result.data;
            }else {
                Router.push(Routes.LogIn);
            }
        };

        Fetch();
    }, []);

    const ProfileButtonClick = () => {
        Router.push(Routes.LogIn);
    }

    const LogoutButtonClick = () => {
        sessionStorage.removeItem("loginId");
        Router.push(Routes.LogIn);
    }

    const ShowBalanceButtonClick = () => {
        setShowBalance(loggedinData?.role);
        setTimeout(() => {
            setShowBalance("Show Balance");
        }, 5000);
    }

    return (
        <>
            <nav
                className={`fixed w-full top-0 h-14 px-4 duration-300 z-50 backdrop-blur bg-white/50 dark:bg-black/50 border-b border-black/10 dark:border-white/10`}
            >
                <motion.div
                    className="h-full min-w-48 w-[15%] content-center grid grid-cols-4 gap-0 justify-items-center"
                    key={"homeButton"}
                >
                    <button
                        className="outline w-10 h-10 mt-1 col-span-1 content-center grid justify-items-center overflow-hidden rounded-full duration-300 hover:scale-110 active:scale-100"
                        type="button"
                        onClick={ProfileButtonClick}
                    >
                        <Image
                            src={dummyProfile}
                            width={40}
                            height={40}
                            alt="NF"
                            className="bg-white"
                        />
                    </button>
                    <div className=" col-span-3 content-center grid justify-items-center">
                        <p className="">
                            {loggedinData?.userName}
                        </p>
                        <button
                            type="button"
                            onClick={ShowBalanceButtonClick}
                            className="border p-0.5 text-sm rounded-full grid grid-cols-4">
                            <Image
                                src={dollarIcon}
                                width={20}
                                height={20}
                                alt="NF"
                                className="bg-white rounded-full col-span-1"
                            />
                            <p className="col-span-3"> {showBanance} </p>
                        </button>
                    </div>
                </motion.div>
                
                <motion.button
                    className="h-full px-4 absolute top-0 right-4"
                    onClick={LogoutButtonClick}
                    key={"sidebarButton"}
                    whileHover={{
                        scale: 1.2
                    }}
                    whileTap={{
                        scale: 0.9
                    }}
                >
                    Log Out
                </motion.button>
                {
                    (loggedinData?.role == "admin" || loggedinData?.role == "sadmin") && (
                        <button
                            type="button"
                            onClick={() => {Router.push(Routes.AdminDashboard)}}
                            className="border">
                        </button>
                    )
                }
            </nav>
        </>
    );
}

export default DashboardNavbar;