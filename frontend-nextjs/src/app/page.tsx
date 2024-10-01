"use client"
import { useRouter } from "next/navigation";
import _Home from "./pages/home/page";
import { useEffect } from "react";
import Routes from "./routes/routes";
import Loading from "./components/loading/loading";
import Toast from "./components/toast/toast";

const __Home = () => {
  const Router = useRouter();
  useEffect(() => {
    Router.push(Routes.LogIn);
  }, []);

  return (
    <>
      <Loading isLoading={true} message={"Loading Pages..."} />
    </>
  );
}

export default __Home