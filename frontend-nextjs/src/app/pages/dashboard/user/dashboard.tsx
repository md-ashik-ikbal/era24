"use client"

import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import dummyProfile from "@/app/public/images/dummyProfile.png";
import ajkerdealAd1 from "@/app/public/images/ajkerdealAd1.png";
import ajkerdealAd2 from "@/app/public/images/ajkerdealAd2.jpg";
import bikroyAd1 from "@/app/public/images/bikroyAd1.png";
import bikroyAd2 from "@/app/public/images/bikroyAd2.jpg";
import darazAd1 from "@/app/public/images/darazAd1.jpg";
import darazAd2 from "@/app/public/images/darazAd2.png";
import othobaAd1 from "@/app/public/images/othobaAd1.jpeg";

import { AnimatePresence, motion } from "framer-motion";


const UserDashboard = () => {
    const Router = useRouter();
    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [slideNumber, setSlideNumber] = useState<number>(1);

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                if (result.data?.role != "user") {
                    Router.push(Routes.LogIn);
                }
                return result.data;
            } else {
                Router.push(Routes.LogIn);
            }
        };

        Fetch();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(slideNumber == 1) {
                setSlideNumber(slideNumber+1);
            } else if (slideNumber == 2) {
                setSlideNumber(slideNumber+1);
            } else if(slideNumber == 3) {
                setSlideNumber(slideNumber+1);
            } else if(slideNumber == 4) {
                setSlideNumber(slideNumber+1);
            } else if(slideNumber == 5) {
                setSlideNumber(slideNumber+1);
            } else if(slideNumber == 6) {
                setSlideNumber(slideNumber+1);
            } else {
                setSlideNumber(1);
            }
        }, 5000);
    }, [slideNumber]);

    if (loggedinData?.role == "user") {
        return (
            <>
                <div className="border border-white/20 w-[90%] relative left-[5%] my-4 ">
                    <h1 className="border-b border-white/20 mb-4 py-2 text-3xl text-center">My Ads</h1>
                    <div className="grid grid-cols-4">
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            My Work
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Deposit
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Withdraw
                        </button>
                        <button
                            onClick={() => {Router.push(Routes.Packages)}}
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Package
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Profile
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Refer
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Transaction
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Helpline
                        </button>
                    </div>
                </div>
                
                    <div className="border border-white/20 h-[200px] md:h-[500px] w-[90%] relative left-[5%] mb-4 overflow-hidden rounded">
                        <AnimatePresence>
                            {
                                (slideNumber == 1) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={ajkerdealAd1}
                                            alt="NF"
                                            className="object-fill"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 2) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={ajkerdealAd2}
                                            alt="NF"
                                            className=""
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 3) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={bikroyAd1}
                                            alt="NF"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 4) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={bikroyAd2}
                                            alt="NF"
                                            className="object-fill"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 5) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={darazAd1}
                                            alt="NF"
                                            className="object-fill"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 6) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={darazAd2}
                                            alt="NF"
                                            className="object-fill"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                (slideNumber == 7) && (
                                    <motion.div
                                        className="absolute left-0 right-0 grid place-items-center"
                                        initial={{
                                            opacity: 0,
                                            x: -1000
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 1000
                                        }}
                                        transition={{
                                            duration: 1
                                        }}
                                    >
                                        <Image
                                            src={othobaAd1}
                                            alt="NF"
                                            className="object-fill"
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>

                <div className="border border-white/20 w-[90%] relative left-[5%] mb-4 rounded ">
                    <h1 className="border-b border-white/20 mb-4 py-2 text-3xl text-center">Company</h1>
                    <div className="grid grid-cols-4">
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Settings
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            About
                        </button>
                    </div>
                </div>

                <div className="border border-white/20 w-[90%] relative left-[5%] mb-4 rounded ">
                    <h1 className="border-b border-white/20 mb-4 py-2 text-3xl text-center">Other Partner</h1>
                    <div className="grid grid-cols-4">
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Daraz
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            AjkerDeal
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Bikroy
                        </button>
                        <button
                            className="mb-4 grid justify-items-center rounded"
                        >
                            <div className="w-10 h-10 mb-2 rounded-full overflow-hidden">
                                <Image
                                    src={dummyProfile}
                                    alt="NF"
                                    className=""
                                />
                            </div>
                            Othoba
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default UserDashboard;