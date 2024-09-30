import DashboardNavbar from "@/app/components/dashboardNav";

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <>
            <DashboardNavbar />
            <div className="relative top-14">
                {children}
            </div>
        </>
    );
}

export default DashboardLayout;