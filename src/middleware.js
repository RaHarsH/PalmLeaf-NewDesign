import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === '/';

    const token = request.cookies.get('token')?.value || "";

    // if(isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/profile', request.nextUrl));
    // }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        // '/profile/:id',
        '/auth/signin',
        '/auth/signup',
    ]
}