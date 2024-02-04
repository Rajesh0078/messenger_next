import { NextResponse } from "next/server";

const clientUrl = "https://messenger-next.onrender.com/"

const routes = {
    chat: clientUrl + "chat",
    settings: clientUrl + "settings",
    search: clientUrl + "search",
    profile: clientUrl + "profile",
    searchUser: clientUrl + '/user/:[id]'
}

export async function middleware(req) {
    const url = req.url
    const token = req.cookies.has("token")

    if (token && url === clientUrl) {
        return NextResponse.redirect(routes.chat)
    }
    if (!token && (
        url === routes.chat ||
        url === routes.profile ||
        url === routes.search ||
        url === routes.settings
    )) {
        return NextResponse.redirect(clientUrl);
    }

    if (!token && url.includes("/user/")) {
        return NextResponse.redirect(clientUrl);
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