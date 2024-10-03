"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import backIcon from "@/app/public/images/backIcon.png"

const BackButton = () => {
    const Router = useRouter();
    return(
        <>
            <button
                type="button"
                className="duration-300 hover:text-white/50"
                onClick={() => {Router.back()}}
            >
                <Image
                    src={backIcon}
                    alt="NF"
                    className="border dark:border-white/20 border-black/30 rounded duration-300 hover:bg-white/20"
                />
            </button>
        </>
    );
}

export default BackButton;