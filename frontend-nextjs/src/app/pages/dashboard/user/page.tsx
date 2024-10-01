import { Metadata } from "next";
import UserDashboard from "./dashboard";
import DashboardNavbar from "@/app/components/dashboardNav";

export const metadata: Metadata = {
    title: "Dashboard | User"
}

const _UserDashboard = () => {
    return(
        <>
            <DashboardNavbar />
            <div className="relative top-14">
                <UserDashboard />
            </div>
        </>
    );
}

export default _UserDashboard;