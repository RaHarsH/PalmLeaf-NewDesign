import { NextResponse } from "next/server";
import { pool, testConnection } from '@/utils/db';

export async function DELETE(request) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        
        const { user_id } = reqBody;

        if (!user_id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        console.log("User ID: ", user_id);

        const client = await pool.connect();

        const result = await client.query('DELETE FROM useraccount WHERE user_id = $1', [user_id]);

        client.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("Result after deleting the user: ", result);


        return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}