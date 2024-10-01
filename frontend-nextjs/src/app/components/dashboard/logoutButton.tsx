"use client"

import Routes from "@/app/routes/routes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
            Log Out
        </motion.button>
    );
}

export default LogoutButton;