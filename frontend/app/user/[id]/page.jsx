"use server"
import Layout from "@/components/Layout"
import Loader from "@/components/Loader"
import SearchedUser from "@/components/SearchedUser"
import { fetchUser, searchUser } from "@/utils/routes"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const Page = async ({ params }) => {
    const { value } = cookies().get("token")
    if (value) {
        const data = await fetchUser(value)
        const searchedUser = await searchUser(params.id)
        if (data?.success) {
            return (
                <Layout user={data?.user}>
                    <SearchedUser user={searchedUser?.user} currentUser={data?.user} />
                </Layout>
            )
        } else if (data?.error) {
            redirect("/")
        } else {
            return <Loader />
        }
    } else {
        console.log(value)
    }

}

export default Page