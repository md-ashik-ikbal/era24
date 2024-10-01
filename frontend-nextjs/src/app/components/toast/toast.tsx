"use client"

import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ isShow, message, bgColor }: Readonly<{isShow: boolean, message: string, bgColor: string }>) => {

    return (
        <AnimatePresence>
            {
                (isShow) && (
                    <motion.div
                        className={`border border-white/30 rounded fixed top-16 md:left-[25%] left-[5%] h-[calc(7%)] md:w-[calc(50%)] w-[90%] z-50 content-center grid justify-items-center backdrop-blur-xl ${bgColor == "red" ? "bg-rose-700/50" : "bg-blue-700/50"}`}
                        initial={{
                            opacity: 0,
                            y: -300
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -100
                        }}
                        transition={{
                            duration: 1
                        }}
                    >
                        <p className={`md:text-lg text-sm mx-2 font-semibold`}>{message}</p>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}

export default Toast