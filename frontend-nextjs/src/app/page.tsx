"use client"
import { useRouter } from "next/navigation";
import _Home from "./pages/home/page";
import { useEffect } from "react";
import Routes from "./routes/routes";

const __Home = () => {
  const Router = useRouter();
  useEffect(() => {
    Router.push(Routes.LogIn);
  }, []);

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export default __Home