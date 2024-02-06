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
    sendMsg: "https://1fb9-2401-4900-1f3f-43f5-9b3-e77a-c83d-7f4e.ngrok-free.app/sugerElite/chat/send"
}

export const clientRoutes = {
    home: "/",
    chat: "/chat",
    search: "/search",
    profile: "/profile",
    settings: "/settings",
    searchedUser: "/user/:id"
}