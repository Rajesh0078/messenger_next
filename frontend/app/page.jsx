"use client"

import { login, register } from "@/utils/routes";
import Image from "next/image";
import { useState } from "react";
import { setCookie } from "nookies"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function Home() {

	const navigate = useRouter()


	const [active, setActive] = useState(true)

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		username: '',
		cpassword: ""
	})

	const activeHandler = (page) => {
		if (page === "login") {
			setActive(true)
		} else {
			setActive(false)
		}
	}

	const changeHandler = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const loginHandler = async (e) => {
		e.preventDefault()
		let data = await login(formData)
		if (data?.success) {
			setCookie(null, "token", data?.token, { secure: true, path: "/", maxAge: 3600, })
			navigate.push("/chat", { scroll: false })
		} else {
			toast.warn(data?.message)
		}
	}

	const registerHandler = async (e) => {
		e.preventDefault()
		const data = await register(formData)
		if (data?.success) {
			toast.success(data?.msg)
			setActive(true)
		} else {
			toast.warn(data?.msg)
		}
		setFormData({
			email: "",
			password: "",
			username: '',
			cpassword: ""
		})
	}


	return (
		<section className="bg-gray-200 min-h-screen flex justify-center items-center">
			<div className="flex justify-center items-center w-[20rem] sm:w-[26rem] flex-col gap-3">
				<Image src='/icon.png' alt="icon" className="w-10 h-10" width={60} height={30} />
				<p className="text-2xl font-semibold text-gray-800">Messanger</p>
				<div className="w-full bg-white shadow-xl">
					<div className="flex justify-between border-b ">
						<button className={`w-[50%] py-3 font-bold ${active ? "bg-blue-800 text-white" : ""}`} onClick={() => activeHandler("login")}>LOGIN</button>
						<button className={`w-[50%] py-3 font-bold ${!active ? "bg-blue-800 text-white" : ""}`} onClick={() => activeHandler("register")}>REGISTER</button>
					</div>
					{active &&
						<>
							<form className="w-full p-5 flex flex-col gap-5" onSubmit={loginHandler} >
								<div>
									<input type="email" name="email" id="email" placeholder="Email" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<div>
									<input type="password" name="password" id="password" placeholder="password" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<input type="submit" value="Login" className="bg-blue-400 cursor-pointer text-white p-2" />
							</form>
							<div className="px-5 text-center">
								<div className="flex items-center justify-between py-1">
									<hr className="w-[45%] bg-gray-800 text-black" /> or <hr className=" w-[45%]" />
								</div>
								<div className="flex justify-between py-5 gap-3">
									<button className={`w-[50%] py-1 border`} >Gmail</button>
									<button className={`w-[50%] py-1 border`} >Facebook</button>
								</div>
							</div>
						</>
					}
					{
						!active &&
						<>
							<form className="w-full p-5 flex flex-col gap-3" onSubmit={registerHandler}>
								<div>
									<input type="text" name="username" value={formData.username} id="username" placeholder="Username" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<div>
									<input type="email" name="email" value={formData.email} id="email" placeholder="Email" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<div>
									<input type="password" name="password" value={formData.password} id="password" placeholder="password" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<div>
									<input type="password" name="cpassword" value={formData.cpassword} id="cpassword" placeholder="confirm password" className="w-full outline-none border p-3" required autoComplete="off" onChange={changeHandler} />
								</div>
								<input type="submit" value="Register" className="bg-green-700 cursor-pointer text-white p-2" />
							</form>
						</>
					}
				</div>
			</div>
		</section>
	);
}
