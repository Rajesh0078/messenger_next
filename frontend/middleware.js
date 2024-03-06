import { NextResponse } from "next/server";

// const url = "https://messenger-next.onrender.com"
// const url = "http://localhost:3000"
const url = "https://messenger-next-omega.vercel.app"

const routes = {
    chat: "/chat",
    settings: "/settings",
    search: "/search",
    profile: "/profile",
    searchUser: '/user/:[id]'
}

export async function middleware(req) {

    const path = req.nextUrl.pathname

    const isPublicPath = path === "/"
    const token = req.cookies.get('token')?.value

    if (token && isPublicPath) {
        return NextResponse.redirect(url + routes.chat)
    }
    if (!token && (
        path === routes.chat ||
        path === routes.profile ||
        path === routes.search ||
        path === routes.settings
    )) {
        return NextResponse.redirect(url);
    }

    if (!token && path.includes("/user/")) {
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        '/', '/chat', '/search', '/profile', '/user/:path*',
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}