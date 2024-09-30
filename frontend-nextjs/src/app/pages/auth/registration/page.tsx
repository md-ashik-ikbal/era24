import { Metadata } from "next";
import Registration from "./registration";

export const metadata: Metadata = {
    title: "Registration"
}

const _Registration = () => {
    return(
        <>
            <Registration />
        </>
    );
}

export default _Registration;