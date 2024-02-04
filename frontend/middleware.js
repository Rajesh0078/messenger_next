import { NextResponse } from "next/server";

const clientUrl = "https://messenger-next.onrender.com/"

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
        return NextResponse.redirect(routes.chat)
    }
    if (!token && (
        url === routes.chat ||
        url === routes.profile ||
        url === routes.search ||
        url === routes.settings
    )) {
        return NextResponse.redirect("/");
    }

    if (!token && url.includes("/user/")) {
        return NextResponse.redirect("/");
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