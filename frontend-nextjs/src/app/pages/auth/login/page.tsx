import { Metadata } from "next";
import LogIn from "./login";

export const metadata: Metadata = {
    title: "Log In"
}

const _LogIn = () => {
    return(
        <>
            <LogIn />
        </>
    );
}

export default _LogIn;