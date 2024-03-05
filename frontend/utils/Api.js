export const baseUrl = "https://messanger-j570.onrender.com"

export const API = {
    login: baseUrl + "/auth/login",
    register: baseUrl + "/auth/register",
    getUser: baseUrl + "/auth/getuser",
    postMsg: baseUrl + "/chat/sendmsg",
    getMsg: baseUrl + "/chat/getmsg",
    allUsers: baseUrl + "/auth/users",
    findUser: baseUrl + '/auth/finduser',
    setNotification: baseUrl + "/notify/setnotification",
    getNotification: baseUrl + "/notify/getnotification",
    sendMsg: "https://62a8-2401-4900-1f3e-20d9-a980-a1a8-a2d4-46d1.ngrok-free.app/sugerElite/chat/send"
}

export const clientRoutes = {
    home: "/",
    chat: "/chat",
    search: "/search",
    profile: "/profile",
    settings: "/settings",
    searchedUser: "/user/:id"
}