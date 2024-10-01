import { Metadata } from "next";
import Packages from "./packages";

export const metadata: Metadata = {
    title: "Packages"
}

const _Packages = () => {
    return <Packages />
}

export default _Packages;