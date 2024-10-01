"use client"

import Routes from "@/app/routes/routes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoutIcon from "@/app/public/images/logout.png";

const LogoutButton = () => {
    const Router = useRouter();

    const LogoutButtonClick = () => {
        sessionStorage.removeItem("loginId");
        Router.push(Routes.LogIn);
    }

    return (
        <motion.button
            className="px-4 h-full w-full"
            onClick={LogoutButtonClick}
            key={"sidebarButton"}
            whileHover={{
                scale: 1.2
            }}
            whileTap={{
                scale: 0.9
            }}
        >
            <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                    src={LogoutIcon}
                    alt="NF"
                />
            </div>
        </motion.button>
    );
}

export default LogoutButton;