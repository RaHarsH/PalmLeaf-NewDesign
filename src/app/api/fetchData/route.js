import { pool, testConnection } from "@/utils/db";

export async function GET(request) {
  try {
    const isConnected = await testConnection();
    console.log(isConnected);

    if (!isConnected) {
      return new Response(
        JSON.stringify({ message: "Database connection failed" }),
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    console.log(url);
    
    const tableName = url.searchParams.get("tableName");

    // Validate tableName
    if (!tableName) {
      return new Response(JSON.stringify({ message: "Table name is required" }), { status: 400 });
    }

    console.log(`Table name: ${tableName}`);
    

    const allowedTables = [
      "useraccount",
      "accesscontrol",
      "grantha",
      "granthadeck",
      "granthatype",
      "author",
      "location",
      "bundle",
      "physicalcondition",
      "conservationhistory",
      "storagemechanism",
      "digitalfile",
      "scannedimage",
      "scanningproperties",
      "granthalanguage",
      "language",
    ];

    if (!allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ message: "Invalid table name" }), { status: 400 });
    }

    const sql = `SELECT * FROM ${tableName}`;

    let client;
    try {
      client = await pool.connect();
      const result = await client.query(sql);
      return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
      console.error("Error fetching data:", error);
      return new Response(JSON.stringify({ message: "Error fetching data" }), { status: 500 });
    } finally {
      if (client) client.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
