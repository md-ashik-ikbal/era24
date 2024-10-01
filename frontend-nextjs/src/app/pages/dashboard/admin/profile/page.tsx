import { Metadata } from "next";
import AdminProfile from "./profile";

export const metadata: Metadata = {
    title: "Profile | Admin"
}

const _AdminProfile = () => {
    return (
        <AdminProfile />
    );
}

export default _AdminProfile;