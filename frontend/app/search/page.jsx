import Layout from "@/components/Layout"
import SearchPage from "@/components/SearchPage"
import { API } from "@/utils/Api"
import { fetchUser } from "@/utils/routes"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const page = async () => {
    const { value } = cookies().get("token")

    if (value) {
        const data = await fetchUser(value)

        if (data?.success) {
            const call = await fetch(API.allUsers, { cache: "force-cache" })
            const allUsers = await call.json()
            return (
                <Layout user={data?.user} >
                    <SearchPage currentUser={data?.user} users={allUsers} />
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