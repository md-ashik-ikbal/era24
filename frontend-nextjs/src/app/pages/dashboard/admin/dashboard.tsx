"use client"

import LogoutButton from "@/app/components/dashboard/logoutButton";
import DashboardNavbar from "@/app/components/dashboardNav";
import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const Router = useRouter();
    
    const [loggedinData, setLoggedinData] = useState<any>(null);

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                if (result.data?.role != "admin"  && sessionStorage.getItem("loginId") != "-1") {
                    Router.push(Routes.LogIn);
                }
                return result.data;
            } else {
                Router.push(Routes.LogIn);
            }
        };

        Fetch();
    }, []);

    return(
        <div>
            <h1>Welcome</h1>
        </div>
    );
}

export default AdminDashboard;