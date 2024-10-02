import Deposit from "./deposit";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Deposit"
}

const _Deposit = () => {
    return (
        <>
            <Deposit />
        </>
    );
}

export default _Deposit;