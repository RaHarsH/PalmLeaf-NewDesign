import { NextResponse } from "next/server";
import { jwtVerify } from "jose";  // Import jose for JWT verification


export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === '/';

    const token = request.cookies.get('token')?.value || "";

    console.log("Token: ",token);
    

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    }


    /*
        This code below is giving an error when logging out 
        so i am commenting it out
    */

    // Decode and verify JWT token using jose
    // const userData = token ? await verifyToken(token) : null;

    // if (userData) {
    //     const userRole = userData.role;

    //     console.log("Role: ",userRole);
        
    //     console.log(path);
        
    //     // If user tries to access /admin/dashboard without ADMIN role, redirect to /profile
    //     if (path === "/admin/dashboard" && userRole.toUpperCase() !== "ADMIN") {
    //         return NextResponse.redirect(new URL("/profile", request.nextUrl));
    //     }
    // } else {
    //     return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
    // }

}

export const config = {
    matcher: [
        '/',
        '/profile',
        // '/profile/:id',
        '/admin/dashboard',
        '/admin/dashboard/userManagement',
        '/admin/dashboard/dataManagement',
        '/admin/dashboard',
        '/auth/signin',
        '/auth/signup',
    ]
}

/*

async function verifyToken(token) {
    try {
        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET); 
        const { payload } = await jwtVerify(token, secret);
        return payload; // Return decoded payload (includes role)
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

async function getUserRole(token) {

    const userData = await verifyToken(token);

    if (userData) {
        const userRole = userData.role;
        return userRole;
    }

    return undefined;
}

*/