import Layout from "@/components/Layout"
import Loader from "@/components/Loader"
import { fetchUser } from "@/utils/routes"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const page = async () => {
    const { value } = cookies().get("token")
    if (value) {
        const data = await fetchUser(value)
        if (data?.success) {
            return (
                <Layout user={data?.user}>
                    <div className="pt-[3.5rem]">
                        Profile
                    </div>
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

export default page