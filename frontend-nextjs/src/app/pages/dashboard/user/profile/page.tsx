import { Metadata } from "next";
import UserProfile from "./profile";

export const metadata: Metadata = {
    title: "Profile | User"
}

const _UserProfile = () => {
    return(
        <>
            <UserProfile />
        </>
    );
}

export default _UserProfile;