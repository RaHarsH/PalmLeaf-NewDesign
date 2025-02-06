import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log("Decoded Token: ", decodedToken)
        return decodedToken
    } catch (error) {
        throw new Error(error.message)
    }
}