import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.url
    const token = req.cookies.has("token")

    if (token && url.includes('/auth/login')) {
        return NextResponse.redirect("http://localhost:3000/")
    }

    if (!token && url === "http://localhost:3000/") {
        return NextResponse.redirect("http://localhost:3000/auth/login")
    }
}

export const config = {
    matcher: [
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