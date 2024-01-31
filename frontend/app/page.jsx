"use client"

import { login } from "@/utils/routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setCookie } from "nookies"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/Store/features/users/userReducer";

export default function Home() {

  const navigate = useRouter()
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)


  const [active, setActive] = useState(true)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const activeHandler = () => {
    active ? setActive(false) : setActive(true)
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    let token = await login(formData)
    if (token) {
      setCookie(null, "token", token, { secure: true })
      // navigate.push("/chat")
      window.location.reload()
      dispatch(fetchUser(token))
    } else {
      console.log("token not found")
    }
  }

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  return (
    <section className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center w-[20rem] sm:w-[26rem] flex-col gap-3">
        <Image src='/icon.png' alt="icon" className="w-10 h-10" width={60} height={30} />
        <p className="text-2xl font-semibold text-gray-800">Messanger</p>
        <div className="w-full bg-white shadow-xl">
          <div className="flex justify-between border-b ">
            <button className={`w-[50%] py-3 font-bold ${active ? "bg-blue-800 text-white" : ""}`} onClick={activeHandler}>LOGIN</button>
            <button className={`w-[50%] py-3 font-bold ${!active ? "bg-blue-800 text-white" : ""}`} onClick={activeHandler}>REGISTER</button>
          </div>
          <form className="w-full p-5 flex flex-col gap-5" onSubmit={loginHandler}>
            <div>
              <input type="email" name="email" id="email" placeholder="Email" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder="password" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
            </div>
            <input type="submit" value="Login" className="bg-blue-400 text-white p-2" />
          </form>
          <div className="px-5 text-center">
            <div className="flex items-center justify-between">
              <hr className="w-[45%] bg-gray-800 text-black" /> or <hr className=" w-[45%]" />
            </div>
            <div className="flex justify-between py-5 gap-3">
              <button className={`w-[50%] py-1 border`} >Gmail</button>
              <button className={`w-[50%] py-1 border`} >Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
