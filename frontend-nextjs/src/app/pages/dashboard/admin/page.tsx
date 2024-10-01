import { Metadata } from "next";
import AdminDashboard from "./dashboard";

export const metadata: Metadata = {
    title: "Dashboard | Admin"
}

const _AdminDashboard = () => {
    return(
        <AdminDashboard />
    );
}

export default _AdminDashboard;