// src/app/api/fetchData/route.js

import { getClient } from "@/utils/db";

export async function GET() {
    const client = getClient();

  await client.connect();

  try {
    const res = await client.query('SELECT * FROM your_table_name');
    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    return new Response('Error fetching data', { status: 500 });
  } finally {
    await client.end();
  }
}
