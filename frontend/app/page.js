"use client"
import { logout } from "@/utils/routes";
import { useRouter } from "next/navigation";

export default function Home() {

  const navigate = useRouter()

  const logoutHandler = async () => {
    localStorage.clear()
    const status = await logout()
    if (status) {
      navigate.push("/auth/login")
    }
  }


  return (
    <>
      HomePage
      <p onClick={logoutHandler}>Logout</p>
    </>
  );
}
