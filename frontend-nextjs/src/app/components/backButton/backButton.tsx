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
                className="text-white/30 text-sm text-center duration-300 hover:text-white/50"
                onClick={() => {Router.back()}}
            >
                <Image
                    src={backIcon}
                    alt="NF"
                    className="bg-white/30 drop-shadow-3xl rounded duration-300 hover:bg-white/50"
                />
            </button>
        </>
    );
}

export default BackButton;