"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Routes from "./routes/routes";
import Loading from "./components/loading/loading";

const __Home = () => {
  const Router = useRouter();
  useEffect(() => {
    Router.push(Routes.LogIn);
  });

  return (
    <>
      <Loading isLoading={true} message={"Loading Pages..."} />
    </>
  );
}

export default __Home