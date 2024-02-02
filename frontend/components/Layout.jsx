import Header from "./Header"


const Layout = async ({ children, user }) => {

    return (
        <>
            <Header user={user} />
            {children}
        </>
    )
}

export default Layout