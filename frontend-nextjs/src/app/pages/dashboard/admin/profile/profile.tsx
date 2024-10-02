"use client"

import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AdminProfile = () => {
    const Router = useRouter();

    const [loggedinData, setLoggedinData] = useState<any>(null);

    useEffect(() => {
        const Fetch = async () => {
            if (sessionStorage.getItem("loginId") != null) {
                const result = await axios.get(API_ENDPOINTS.GetDataById + sessionStorage.getItem("loginId"));
                setLoggedinData(result.data);
                if (result.data?.role != "admin" && sessionStorage.getItem("loginId") != "-1") {
                    Router.push(Routes.LogIn);
                }
                return result.data;
            } else {
                Router.push(Routes.LogIn);
            }
        };

        Fetch();
    }, []);

    if(loggedinData != null) {
        return(
            <div>
                <h1>{loggedinData?.role + " Welcome."}</h1>
            </div>
        );
    } else {
        return(
            <h1>Loading</h1>
        );
    }
}

export default AdminProfile;