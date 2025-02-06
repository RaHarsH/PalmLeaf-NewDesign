import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getToken } from "@/helpers/getToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request) {
    try {
        const token = getToken(request);

        // useful for getting roles and ids of users for role based authentication
        const decodedToken = getDataFromToken(request);

        return NextResponse.json({
            message: "token fetched successfully!",
            token,
            decodedToken,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}