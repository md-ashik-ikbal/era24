import { Metadata } from "next";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
    title: "Dashboard"
}

const _UserDashboard = () => {
    return(
        <Dashboard />
    );
}

export default _UserDashboard;