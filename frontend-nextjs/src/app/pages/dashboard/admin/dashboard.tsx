"use client"

import LogoutButton from "@/app/components/dashboard/logoutButton";
import DashboardNavbar from "@/app/components/dashboardNav";
import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SuperAdminDetails } from "./profile/adminDetails";
import Loading from "@/app/components/loading/loading";
import Image from "next/image";
import showActionIcon from "@/app/public/images/showAction.png"

const AdminDashboard = () => {
    const Router = useRouter();

    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const [packages, setPackages] = useState<any>(null);
    const [depoReq, setDepoReq] = useState<any>(null);
    const [isActionShow, setIsActionShow] = useState(false);
    const [depoReqDetails, setDepoReqDetails] = useState<any>(null);

    useEffect(() => {
        const URLProtect = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                if (sessionStorage.getItem("loginId") == "-1") {
                    setLoggedinData(SuperAdminDetails);
                } else {
                    try {
                        const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                        setLoggedinData(result.data);
                        if (result.data?.role != "admin" && sessionStorage.getItem("loginId") != "-1") {
                            Router.push(Routes.LogIn);
                        }

                        return result.data;
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                Router.push(Routes.LogIn);
            }
        };

        URLProtect();
    }, []);

    useEffect(() => {
        const FetchPackages = async () => {
            try {
                const result = await axios.get(API_ENDPOINTS.GetAllPackages);
                setPackages(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        const FetchUsers = async () => {
            try {
                const result = await axios.get(API_ENDPOINTS.GetAllUsers);
                setUsers(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        FetchUsers();
        FetchPackages();
    }, []);

    useEffect(() => {
        const FetchDepoReq = async () => {
            try {
                const result = await axios.get(API_ENDPOINTS.GetAlDepositRequest);
                setDepoReq(result.data);
            } catch (error) {
                console.log(error);
            }
        }

        FetchDepoReq();
    }, []);

    useEffect(() => {
        if (isActionShow) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isActionShow]);

    
    const depoReqClick = (e: any) => {
        setDepoReqDetails(e);

        if(!isActionShow) {
            setIsActionShow(true);
        }
    };

    const AcceptButtonClick = async () => {
        try {
            const depoStatusUpdateResponse = await axios.patch(API_ENDPOINTS.PatchDepoStatus+depoReqDetails?.depodrawId, {
                status: "accepted"
            });

            const depoBalanceUpdateResponse = await axios.patch(API_ENDPOINTS.PatchUserBalance+depoReqDetails?.userId, {
                balance: +depoReqDetails.amount
            });

        } catch (error) {
            console.log(error)
        }
        setIsActionShow(false);
    }

    if (users != null && packages != null && loggedinData != null && depoReq != null) {
        return (
            <>
                <AnimatePresence>
                    {
                        isActionShow && (
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
                                className="overflow-hidden fixed z-50 border dark:border-white/20 border-black/30 rounded md:top-14 top-[70px] left-[5%] h-[90%] w-[90%] p-2"
                                >

                                <motion.div
                                    className="border dark:bg-black/20 bg-gray-400 dark:border-white/20 border-black/30 md:w-1/2 w-full absolute bottom-0 md:bottom-[13%] md:left-1/4 left-0 rounded"
                                    initial={{
                                        opacity: 0,
                                        // scale: 1.2
                                        transform: "scale(1.2)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transform: "scale(1)"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transform: "scale(1.2)"
                                    }}
                                    transition={{
                                        duration: 0.5
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {setIsActionShow(false)}}
                                        className="absolute right-1.5 top-0.5 border border-rose-700 text-center px-2 rounded my-1 text-rose-700 duration-300 hover:bg-black/20 hover:bg-rose-700 hover:text-gray-900 hover:scale-110 active:scale-100"
                                    >
                                        close
                                </button>
                                    
                                                <h1 className="text-center text-xl py-2 border-b border-black/30 dark:border-white/20">Confirm</h1>
                                                <p className="border-b border-black/30 dark:border-white/20 p-2 mb-1 text-center italic">A drposit request has been made with the following details :</p>
                                                <div className="text-center mt-2 grid grid-rows-5 gap-1 h-[35%] justify-center ">
                                                    <p className="row-span-1 border border-black/30 dark:border-white/20 rounded px-4 pb-0.5">User Id: {depoReqDetails.userId} </p>
                                                    <p className="row-span-1 border border-black/30 dark:border-white/20 rounded px-4 pb-0.5">Phone: {depoReqDetails.phone} </p>
                                                    <p className="row-span-1 border border-black/30 dark:border-white/20 rounded px-4 pb-0.5">Amount: {depoReqDetails.amount} </p>
                                                    <p className="row-span-1 border border-black/30 dark:border-white/20 rounded px-4 pb-0.5">Transaction Id: {depoReqDetails.transactionId} </p>
                                                    <p className="row-span-1 border border-black/30 dark:border-white/20 rounded px-4 pb-0.5">Payment Method: {depoReqDetails.paymentMethod} </p>
                                                </div>
                                                
                                    {
                                        (depoReqDetails.status == "pending") && (
                                            <>
                                                <textarea
                                                    placeholder="Send a quick message...."
                                                    className="bg-transparent p-4 h-24 outline outline-1 dark:outline-white/20 outline-black/30 duration-300 focus:outline-4 text-center rounded relative top-4 w-[90%] left-[5%] "
                                                />
                                                <button
                                                    type="button"
                                                    onClick={AcceptButtonClick}
                                                    className="relative w-[90%] left-[5%] top-4 border border-blue-700 text-center p-1 mt-4 rounded my-1 px-2 text-blue-700 duration-300 hover:bg-black/20 hover:bg-blue-700 hover:text-gray-900 hover:scale-110 active:scale-100"
                                                >
                                                    Accept
                                                </button>
                                                <button type="button"
                                                    className="relative w-[90%] left-[5%] top-4 border border-rose-700 text-center p-1 rounded mb-8 mt-4 px-2 text-rose-700 duration-300 hover:bg-black/20 hover:bg-rose-700 hover:text-gray-900 hover:scale-110 active:scale-100"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )
                                    }
                                    {
                                        (depoReqDetails.status == "accepted") && (
                                            <>
                                                <h1 className="text-center my-8 pt-4 underline italic px-4 font-bold text-3xl text-blue-700">This Request has been accepted.</h1>
                                                <button
                                                    type="button"
                                                    onClick={() => {setIsActionShow(false)}}
                                                    className="relative w-[90%] left-[5%] top-4 bottom-16 border border-blue-700 text-center p-1 mt-4 mb-8 rounded my-1 px-2 text-blue-700 duration-300 hover:bg-black/20 hover:bg-blue-700 hover:text-gray-900 hover:scale-110 active:scale-100"
                                                >
                                                    Done
                                                </button>
                                            </>
                                        )
                                    }
                                </motion.div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                <div className="rounded relative w-[90%] left-[5%] mt-4 overflow-auto border shadow dark:border-slate-600 border-black/30">
                    <h1 className="border-b border-black/30 dark:border-white/20 text-center text-3xl pb-2 font-semibold">Request Pannel</h1>
                    <table className="table-auto min-w-full ">
                        <thead className="">
                            <tr className="h-10">
                                <th className="">Id</th>
                                <th className="">User Id</th>
                                <th>Phone</th>
                                <th>Amount</th>
                                <th>Request Type</th>
                                <th>Transaction Id</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                depoReq.map((dr: any) => (
                                    <tr
                                        key={dr?.depodrawId}
                                        onClick={() => {depoReqClick(dr)}}
                                        className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 dark:hover:bg-white/20">
                                        <td>{dr?.depodrawId}</td>
                                        <td>{dr?.userId}</td>
                                        <td>{dr?.phone}</td>
                                        <td>{dr?.amount}</td>
                                        <td>{dr?.requestType}</td>
                                        <td>{dr?.transactionId}</td>
                                        <td>{dr?.paymentMethod}</td>
                                        <td>{dr?.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="rounded relative w-[90%] left-[5%] mt-4 overflow-auto border shadow dark:border-slate-600 border-black/30">
                    <h1 className="border-b border-black/30 dark:border-white/20 text-center text-3xl pb-2 font-semibold">Admins</h1>
                    <table className="table-auto min-w-full ">
                        <thead className="">
                            <tr className="h-10">
                                <th className="">Id</th>
                                <th className="">Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user: any) => (
                                    (user?.role == "admin") && (
                                        <tr key={user?.id} className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 dark:hover:bg-white/20">
                                            <td>{user?.id}</td>
                                            <td>{user?.userName}</td>
                                            <td>{user?.email}</td>
                                            <td className="p-0 flex justify-center">
                                                {
                                                    loggedinData?.role == "sadmin" ? (
                                                        <button className="w-10 h-10 scale-90 rounded duration-300 hover:bg-rose-700 p-0 m-0">
                                                            <Image
                                                                src={showActionIcon}
                                                                alt=""
                                                                className="scale-75"
                                                            />
                                                        </button>
                                                    ) : (
                                                        <p className="text-sm text-rose-700">Only Super Admin Can Modify Admin</p>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="rounded relative w-[90%] left-[5%] mt-4 overflow-auto border shadow dark:border-slate-600 border-black/30">
                    <h1 className="border-b border-black/30 dark:border-white/20 text-center text-3xl pb-2 font-semibold">Users</h1>
                    <table className="table-auto min-w-full ">
                        <thead className="">
                            <tr className="h-10">
                                <th className="">Id</th>
                                <th className="">Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user: any) => (
                                    (user.role == "user") && (
                                        <tr key={user?.id} className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 dark:hover:bg-white/20">
                                            <td>{user?.id}</td>
                                            <td>{user?.userName}</td>
                                            <td>{user?.email}</td>
                                            <td className="flex justify-center">
                                                <button className="w-10 h-10 scale-90 rounded duration-300 hover:bg-rose-700 p-0 m-0">
                                                    <Image
                                                        src={showActionIcon}
                                                        alt=""
                                                        className="scale-75"
                                                    />
                                                </button>
                                                {/* <button className=" relative left-0 w-[100%] h-10 duration-300 hover:bg-rose-700">Actions</button> */}
                                            </td>

                                        </tr>
                                    )
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="rounded relative w-[90%] left-[5%] mt-4 overflow-auto border dark:border-slate-600 border-black/30">
                    <h1 className="border-b border-black/30 dark:border-white/20 text-center text-3xl pb-2 font-semibold">Packages</h1>
                    <table className="table-auto min-w-full ">
                        <thead className="">
                            <tr className="h-10">
                                <th className="">Id</th>
                                <th className="">Title</th>
                                <th>Duration</th>
                                <th>Ads/Day</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                packages.map((pkg: any) => (
                                    <tr key={pkg?.packagesId} className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 dark:hover:bg-white/20">
                                        <td>{pkg?.packagesId}</td>
                                        <td>{pkg?.title}</td>
                                        <td>{pkg?.duration}</td>
                                        <td>{pkg?.description}</td>
                                        <td>{pkg?.price}</td>
                                        <td className="flex justify-center">
                                            <button className="w-10 h-10 scale-90 rounded duration-300 hover:bg-rose-700 p-0 m-0">
                                                <Image
                                                    src={showActionIcon}
                                                    alt=""
                                                    className="scale-75"
                                                />
                                            </button>
                                            {/* <button className=" relative left-0 w-[100%] h-10 duration-300 hover:bg-rose-700">Actions</button> */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    } else {
        return (
            <Loading isLoading={true} message={"Loading Data..."} />
        );
    }
}

export default AdminDashboard;