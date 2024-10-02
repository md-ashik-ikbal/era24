"use client"

import Loading from "@/app/components/loading/loading";
import Toast from "@/app/components/toast/toast";
import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Packages = () => {
    const Router = useRouter();

    const [packages, setPackages] = useState<any>(null);
    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [toast, setToast] = useState({
        isShow: false,
        message: "",
        bgColor: "",
    });

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                return result.data;
            }
        };

        Fetch();
    }, []);

    useEffect(() => {
        const Fetch = async () => {
            const result = await axios.get(API_ENDPOINTS.GetAllPackages);
            setPackages(result.data);
        };
        
        Fetch();

    }, []);

    useEffect(() => {
        const Timer = setTimeout(() => {
            setToast({
                isShow: false,
                bgColor: "",
                message: "",
            });
        }, 5000);
        return () => clearInterval(Timer);
    }, [toast.isShow]);

    const BuyNowButtonClick = async (pkgId: any, pkgPrice: any) => {
        if(loggedinData?.balance >= pkgPrice){
            setToast({
                bgColor: "blue",
                isShow: true,
                message: `Success`
            });
        } else {
            setToast({
                bgColor: "red",
                isShow: true,
                message: `You need more ${parseFloat(pkgPrice) - parseFloat(loggedinData.balance)} BDT to purchase this package`
            });
        }
    }

    if(packages != null) {
        return (
            <>
                <Toast isShow={toast.isShow} message={toast.message} bgColor={toast.bgColor} />
                <div className="border dark:border-white/20 border-black/30 shadow-xl w-[90%] relative left-[5%] mt-4 rounded">
                    <h1 className="text-3xl text-center border-b dark:border-white/20 border-black/30 pb-1.5 mb-2">Packages</h1>
                    <div className=" grid md:grid-cols-3 grid-cols-1 rounded ">
                        {
                            packages.map((pkg: any) => (
                                <div
                                    key={pkg.packagesId}
                                    className="border dark:border-white/20 border-black/30 shadow-xl dark:shadow-gray-700/10 text-center m-2 rounded overflow-hidden"
                                >
                                    <h1 className="border-b border-white/20 text-xl pb-1">
                                        {pkg.title}
                                    </h1>
                                    <p className="my-4">
                                        Duration: {pkg.duration} <br />
                                        {pkg.description} <br />
                                        {pkg.price + " BDT Only"}

                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => BuyNowButtonClick(pkg.packagesId, pkg.price)}
                                        className="border-t dark:border-white/20 border-black/30 w-[100%] h-10 mt-2 text-lg font-semibold duration-300 hover:bg-indigo-700 hover:text-white"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        );
    } else {
        return(
            <Loading isLoading={true} message={"Loading Packages..."} />
        );
    }
}

export default Packages;