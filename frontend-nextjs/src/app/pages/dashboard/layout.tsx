import DashboardNavbar from "@/app/components/dashboardNav";

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <>
            <DashboardNavbar />
            {children}
        </>
    );
}

export default DashboardLayout;