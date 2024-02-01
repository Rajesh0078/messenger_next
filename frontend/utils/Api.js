const baseUrl = "http://localhost:8080"

export const API = {
    login: baseUrl + "/auth/login",
    register: baseUrl + "/auth/register",
    getUser: baseUrl + "/auth/getuser",
    postMsg: baseUrl + "/chat/sendmsg",
    getMsg: baseUrl + "/chat/getmsg",
    allUsers: baseUrl + "/auth/users"
}