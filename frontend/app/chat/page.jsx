import Home from "@/components/Home"
import Layout from "@/components/Layout"
import { API } from "@/utils/Api"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const page = async () => {
    const { value } = cookies().get("token")
    if (value) {
        const res = await fetch(API.getUser, { headers: { "x-token": value }, cache: "force-cache" })
        const data = await res.json()
        if (data?.success) {

            const call = await fetch(API.allUsers, { cache: "force-cache" })
            const allUsers = await call.json()
            return (
                <Layout user={data?.user} >
                    <Home allUsers={allUsers} currentUser={data?.user} />
                </Layout>
            )
        } else if (data?.error) {
            redirect("/")
        }
    } else {
        redirect("/")
    }

}

export default page