"use client"

import BackButton from "@/app/components/backButton/backButton";
import Loading from "@/app/components/loading/loading";
import Toast from "@/app/components/toast/toast";
import API_ENDPOINTS from "@/app/routes/api";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
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
    const [activatedPackages, setActivatedPackages] = useState<any>(null);
    const [isAdShow, setIsAddShow] = useState(false);

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
        const FetchPurchasedPackages = async () => {
            const result = (await axios.get(API_ENDPOINTS.GetActivatedPackagesByUserId + sessionStorage.getItem("loginId"))).data;
            setActivatedPackages(result);
        }

        FetchPurchasedPackages();
    }, [])

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

    const BuyNowButtonClick = async (pkg: any) => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + parseInt(pkg.duration));

        const year = currentDate.getFullYear();
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentDay = String(currentDate.getDate()).padStart(2, '0');

        const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
        const futureDay = String(futureDate.getDate()).padStart(2, '0');

        const formattedCurrentDate = `${currentDay}-${currentMonth}-${year}`;
        const formattedFutureDate = `${futureDay}-${futureMonth}-${year}`;

        if (loggedinData?.balance >= pkg.price) {
            try {
                const caResponse = await axios.post(API_ENDPOINTS.CreateActivity, {
                    userId: loggedinData.id,
                    packageId: pkg.packagesId,
                    packageTitle: pkg.title,
                    packageStatus: "active",
                    activeTime: formattedCurrentDate,
                    expireTime: formattedFutureDate,
                    remainWatchTime: parseFloat(pkg.description)
                });

                if (caResponse.data != true) {
                    setToast({
                        bgColor: "red",
                        isShow: true,
                        message: caResponse.data
                    });
                } else {
                    await axios.post(`${API_ENDPOINTS.BuyPackage}`, {
                        userId: sessionStorage.getItem("loginId"),
                        packageId: pkg.packagesId,
                        packagePrice: pkg.price,
                    });

                    setLoggedinData((prevData: any) => ({
                        ...prevData,
                        balance: prevData.balance - pkg.price,
                    }));

                    setToast({
                        bgColor: "blue",
                        isShow: true,
                        message: `Success! You've purchased the package. Your new balance is ${loggedinData.balance - pkg.price} BDT.`,
                    });
                }
            } catch (error) {
                console.error(error);
                setToast({
                    bgColor: "red",
                    isShow: true,
                    message: `Error purchasing the package. Please try again.`,
                });
            }
        } else {
            setToast({
                bgColor: "red",
                isShow: true,
                message: `You need more ${parseFloat(pkg.price) - parseFloat(loggedinData.balance)} BDT to purchase this package.`,
            });
        }
    };

    const WatchAdButtonClick = async (pkg: any) => {
        try {
            if(pkg.remainWatchTime != 0) {
                const getAds = await axios.get(API_ENDPOINTS.GetAdsVideos);
                setIsAddShow(true);
                setTimeout(async () => {
                    await axios.patch(API_ENDPOINTS.UpdateRemainWatchTimesAndBalance+loggedinData.id, {
                        packageId: pkg.packageId,
                        remainWatchTime: pkg.remainWatchTime
                    });
                    setIsAddShow(false);
                    setToast({
                        isShow: true,
                        message: "100 BDT has been added to your account",
                        bgColor: "blue"
                    })
                }, 30000);
            } else {
                setToast({
                    isShow: true,
                    message: "Caught up",
                    bgColor: "blue"
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    if (packages != null && activatedPackages != null) {
        return (
            <>
                <Toast isShow={toast.isShow} message={toast.message} bgColor={toast.bgColor} />
                <AnimatePresence>
                    {
                        isAdShow && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    backdropFilter: "blur(0px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    backdropFilter: "blur(30px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    backdropFilter: "blur(0px)",
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                                className="fixed w-full h-full top-0 bg-black/10 z-50">
                                <h1 className="text-center text-xl mt-2">Viewing Ad...</h1>
                                <video className="h-[90%] w-[90%] rounded-lg absolute left-[5%] top-[5%] " controls>
                                    <source src="/uploads/Ads/1728020246186-329641620.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                <div className="border dark:border-white/20 border-black/30 shadow-xl w-[90%] relative left-[5%] mt-4 rounded">
                    <h1 className="text-3xl text-center border-b dark:border-white/20 border-black/30 pb-1.5 mb-2">My Packages</h1>
                    {
                        activatedPackages.length == 0 ? (
                            <>
                                <h1 className="text-center p-4">Currently You do not have any active packages</h1>
                            </>
                        ) : (
                            <>
                                <div className=" grid md:grid-cols-3 grid-cols-1 rounded ">
                                    {
                                        activatedPackages.map((pkg: any) => (
                                            <div
                                                key={pkg.packageId}
                                                className="border dark:border-white/20 border-black/30 shadow-xl dark:shadow-gray-700/10 text-center m-2 rounded overflow-hidden"
                                            >
                                                <h1 className="border-b border-white/20 text-xl pb-1">
                                                    {pkg.packageTitle}
                                                </h1>
                                                <p className="my-4">
                                                    Purchase Date: {pkg.activeTime} <br />
                                                    Expire Date: {pkg.expireTime} <br />
                                                    Ads Remaining: {pkg.remainWatchTime}
                                                
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => WatchAdButtonClick(pkg)}
                                                    className="border-t dark:border-white/20 border-black/30 w-[100%] h-10 mt-2 text-lg font-semibold duration-300 hover:bg-indigo-700 hover:text-white"
                                                >
                                                    Watch Ad
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }

                </div>

                <div className="border dark:border-white/20 border-black/30 shadow-xl w-[90%] relative left-[5%] mt-4 rounded">
                    <h1 className="text-3xl text-center border-b dark:border-white/20 border-black/30 pb-1.5 mb-2">All Packages</h1>
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
                                        {pkg.price + " BDT Only"} <br />
                                        100 BDT per Ad

                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => BuyNowButtonClick(pkg)}
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
        return (
            <Loading isLoading={true} message={"Loading Packages..."} />
        );
    }
}

export default Packages;