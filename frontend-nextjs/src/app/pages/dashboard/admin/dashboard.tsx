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

    useEffect(() => {
        const Fetch = async () => {
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

        Fetch();
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
    }, [depoReq]);

    const [isActionShow, setIsActionShow] = useState(false);
    const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // e.preventDefault();
        console.log(e)
        if(!isActionShow) {
            const { clientX, clientY } = e;
            setClickPosition({ x: clientX, y: clientY });
            setIsActionShow(true)
        }
      };

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
                                    transform: "translate(-50%, -50%) scale(1.2)",
                                }}
                                animate={{
                                    opacity: 1,
                                    backdropFilter: "blur(20px)",
                                    transform: "translate(-50%, -50%) scale(1)",
                                }}
                                exit={{
                                    opacity: 0,
                                    backdropFilter: "blur(0px)",
                                    transform: "translate(-50%, -50%) scale(1.2)",
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                                className="border shadow absolute z-50 dark:border-white/20 border-black/30 rounded md:w-[10%] w-[30%] p-2 grid grid-rows-2"
                                style={{
                                    left: `${clickPosition?.x}px`,
                                    top: `${clickPosition?.y}px`,
                                  }}
                                >
                                <button type="button" className="w-full text-center p-1 rounded my-1 duration-300 hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110 active:scale-100">Action 1</button>
                                <button
                                    type="button"
                                    onClick={() => {setIsActionShow(false)}}
                                    className="w-full border border-rose-700 text-center p-1 rounded my-1 text-rose-700 duration-300 hover:bg-black/20 hover:bg-rose-700 hover:text-gray-900 hover:scale-110 active:scale-100"
                                >
                                    close
                                </button>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                <div className="rounded relative w-[90%] left-[5%] mt-4 overflow-auto border shadow dark:border-slate-600 border-black/30">
                    <h1 className="border-b border-black/30 dark:border-white/20 text-center text-3xl pb-2 font-semibold">Deposit Request</h1>
                    <table className="table-auto min-w-full ">
                        <thead className="">
                            <tr className="h-10">
                                <th className="">Id</th>
                                <th className="">User Id</th>
                                <th>Phone</th>
                                <th>Amount</th>
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
                                        onClick={() => handleClick(dr.depodrawId)}
                                        className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 dark:hover:bg-white/20">
                                        <td>{dr?.depodrawId}</td>
                                        <td>{dr?.userId}</td>
                                        <td>{dr?.phone}</td>
                                        <td>{dr?.amount}</td>
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