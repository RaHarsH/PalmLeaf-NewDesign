import { NextResponse } from "next/server";
import { pool, testConnection } from '@/utils/db';

export async function PUT(request) {
    try {

        const reqBody = await request.json();
        const { user_id, role } = reqBody;

        if(!user_id || !role) {
            return NextResponse.json({ error: "User ID and Role are required" }, { status: 400 });
        }

        console.log("User ID: ", user_id)
        console.log("Role: ", role)

        const client = await pool.connect();

        const result = await client.query('UPDATE useraccount SET role = $1 WHERE user_id = $2', [role, user_id]);

        console.log("Result after changing the role: ", result);

        client.release();
        
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "User not found or role unchanged." }, { status: 404 });
        }


        return NextResponse.json({ message: "User role updated successfully!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}