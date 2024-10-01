import { Metadata } from "next";
import UserDashboard from "./dashboard";

export const metadata: Metadata = {
    title: "Dashboard | User"
}

const _UserDashboard = () => {
    return(
        <>
            <UserDashboard />
        </>
    );
}

export default _UserDashboard;