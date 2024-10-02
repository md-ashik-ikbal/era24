"use client"

import LogoutButton from "@/app/components/dashboard/logoutButton";
import DashboardNavbar from "@/app/components/dashboardNav";
import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SuperAdminDetails } from "./profile/adminDetails";
import Loading from "@/app/components/loading/loading";

const AdminDashboard = () => {
    const Router = useRouter();
    
    const [loggedinData, setLoggedinData] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const [packages, setPackages] = useState<any>(null);

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                if(sessionStorage.getItem("loginId") == "-1") {
                    setLoggedinData(SuperAdminDetails);
                } else {
                    const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                    setLoggedinData(result.data);
                    if (result.data?.role != "admin"  && sessionStorage.getItem("loginId") != "-1") {
                        Router.push(Routes.LogIn);
                    }

                    return result.data;
                }
            } else {
                Router.push(Routes.LogIn);
            }
        };

        Fetch();
    }, []);

    useEffect(() => {
        const FetchPackages = async () => {
            const result = await axios.get(API_ENDPOINTS.GetAllPackages);
            setPackages(result.data);
        };
        const FetchUsers = async () => {
            const result = await axios.get(API_ENDPOINTS.GetAllUsers);
            setUsers(result.data);
        }
        FetchUsers();
        FetchPackages();
    }, []);

    if(users != null && packages != null && loggedinData != null) {
        return(
            <>
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
                                            <td className="p-0">
                                                {
                                                    loggedinData?.role == "sadmin" ?(
                                                        <button className=" relative left-0 w-[100%] h-10 duration-300 hover:bg-rose-700">Demote</button>
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
                                            <td className=" border-rose-700 p-0">
                                                <button className=" relative left-0 w-[100%] h-10 duration-300 hover:bg-rose-700">Actions</button>
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
                                    <tr key={pkg?.packagesId} className="text-center border-t h-10 dark:border-white/20 border-black/30 duration-300 hover:bg-black/20 hover:bg-white/20">
                                        <td>{pkg?.packagesId}</td>
                                        <td>{pkg?.title}</td>
                                        <td>{pkg?.duration}</td>
                                        <td>{pkg?.description}</td>
                                        <td>{pkg?.price}</td>
                                        <td className=" border-rose-700 p-0">
                                            <button className=" relative left-0 w-[100%] h-10 duration-300 hover:bg-rose-700">Actions</button>
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
        return(
            <Loading isLoading={true} message={"Loading Data..."} />
        );
    }
}

export default AdminDashboard;