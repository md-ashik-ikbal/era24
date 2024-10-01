"use client"

import { AnimatePresence, motion } from "framer-motion"

const Loading = ({
    isLoading,
    message
}: Readonly<{
    isLoading: boolean,
    message: string | undefined | null
 }>) => {

    return (
        <AnimatePresence>
            {
                isLoading && (
                    <motion.div
                        className="fixed top-0 left-0 h-[calc(100%)] w-[calc(100%)] z-50 content-center grid justify-items-center"
                        initial={{
                            opacity: 0,
                            backdropFilter: "blur(0)"
                        }}
                        animate={{
                            opacity: 1,
                            backdropFilter: "blur(50px)"
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: "blur(0)"
                        }}
                    >
                        <motion.div
                            className="p-4 w-fit min-w-[200px] h-fit bg-white/10 rounded-lg outline outline-2 outline-white/20"
                            initial={{
                                opacity: 0,
                                scale: 1.2
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.2
                            }}
                            transition={{
                                duration: 0.3
                            }}
                        >
                            <motion.svg
                                height={"100px"} width={"100px"}
                                className={" rounded-full animate-svgSpin relative mb-1 left-[calc(50%-50px)]"}
                                initial={{
                                    opacity: 0,
                                    y: -500
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 500
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                            >
                                <circle
                                    cx={"50px"}
                                    cy={"50px"}
                                    r={"30"}
                                    fill={"none"}
                                    strokeLinecap={"round"}
                                    stroke={"blue"}
                                    strokeWidth={"5"}
                                    style={{
                                        strokeDasharray: 180,
                                    }}
                                    className={"origin-center animate-dash"}
                                >
                                </circle>
                            </motion.svg>
                            <motion.p
                                className="text-lg text-gray-400/90 text-center w-full font-medium ">
                                {message}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}

export default Loading;