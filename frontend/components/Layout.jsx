import BottomBar from "./BottomBar"
import Header from "./Header"


const Layout = async ({ children, user }) => {

    return (
        <>
            <Header user={user} />
            {children}
            <BottomBar />
        </>
    )
}

export default Layout