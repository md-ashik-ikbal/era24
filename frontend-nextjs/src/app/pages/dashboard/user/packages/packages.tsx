"use client"

import API_ENDPOINTS from "@/app/routes/api";
import Routes from "@/app/routes/routes";
import axios from "axios";
import { useEffect, useState } from "react";

const Packages = () => {
    const [packages, setPackages] = useState<any>(null);

    useEffect(() => {
        const Fetch = async () => {
            const result = await axios.get(API_ENDPOINTS.GetAllPackages);
            setPackages(result.data);
        };

        Fetch();
    }, []);

    console.log(packages);

    return (
        <div>
            <h1>Packages</h1>
            <div>
                {
                    // packages.map((t:string) => {
                    //     <p>
                    //         {t}
                    //     </p>
                    // })
                }
            </div>
        </div>
    );
}

export default Packages;