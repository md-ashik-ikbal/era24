"use client"

import Routes from "@/app/routes/routes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoutIcon from "@/app/public/images/logout.png";
import Loading from "../loading/loading";
import { useState } from "react";

const LogoutButton = () => {
    const Router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const LogoutButtonClick = () => {
        setIsLoading(true);
        sessionStorage.removeItem("loginId");
        Router.push(Routes.LogIn);
    }

    return (
        <>
            <Loading isLoading={isLoading} message={"Logging out..."} />
            <motion.button
                className=" h-full w-full border-2 border-rose-700 rounded-full dark:bg-white/10 bg-black/10"
                onClick={LogoutButtonClick}
                key={"sidebarButton"}
                whileHover={{
                    scale: 1.2
                }}
                whileTap={{
                    scale: 0.9
                }}
            >
                <div className="h-full w-full">
                    <Image
                        src={LogoutIcon}
                        alt="NF"
                        className="scale-75"
                    />
                </div>
            </motion.button>
        </>
    );
}

export default LogoutButton;