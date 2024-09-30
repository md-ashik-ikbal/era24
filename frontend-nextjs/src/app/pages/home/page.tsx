import Home from "./home";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home"
}

const _Home = () => {
    return (
        <>
            <Home />
        </>
    );
}

export default _Home;