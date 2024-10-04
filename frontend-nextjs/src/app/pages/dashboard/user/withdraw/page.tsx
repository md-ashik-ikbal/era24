import { Metadata } from "next";
import Withdraw from "./withdraw";

export const metadata: Metadata = {
    title: "Withdraw"
}

const _Withdraw = () => {
    return(
        <>
            <Withdraw />
        </>
    );
}

export default _Withdraw;