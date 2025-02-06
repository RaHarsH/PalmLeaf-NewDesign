import { NextResponse } from "next/server";
import { pool, testConnection } from '@/utils/db';

export async function GET() {

    try {

        const client = await pool.connect();

        const allUsers = await client.query('SELECT user_id, username, role, email FROM useraccount');

        console.log(allUsers.rows)

        if (allUsers.rows.length == 0) {
            client.release();
            return new Response(
              JSON.stringify({ message: 'No Users found!' }),
              { status: 404 }
            );
        
        
        }

        client.release();

        return NextResponse.json({
            message: "Users fetched successfully!",
            success: true,
            allUsers,
        },
        {
            status: 200,
        })
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}