import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        console.log('====================================');
        console.log('Token from getToken:', token);   
        console.log('====================================');

        // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        // return decodedToken.id

        return token
    } catch (error) {
        throw new Error(error.message)
    }
}