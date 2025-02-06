import { getToken } from "@/helpers/getToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request) {
    try {
        const token = getToken(request);

        return NextResponse.json({
            message: "token fetched successfully!",
            token,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}