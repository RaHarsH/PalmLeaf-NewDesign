import { pool, testConnection } from "@/utils/db";

export async function DELETE(request) {
    try {
      const isConnected = await testConnection();
      console.log(isConnected);
  
      if (!isConnected) {
        return new Response(
          JSON.stringify({ message: "Database connection failed" }),
          { status: 500 }
        );
      }
  
      const { tableName, id } = await request.json();
  
      // Validate inputs
      if (!tableName || !id) {
        return new Response(JSON.stringify({ message: "Invalid request body" }), { status: 400 });
      }
  
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
  
      const sql = `DELETE FROM ${tableName} WHERE id = $1`;
  
      let client;
      try {
        client = await pool.connect();
        await client.query("BEGIN");
  
        await client.query(sql, [id]);
  
        await client.query("COMMIT");
        return new Response(JSON.stringify({ message: "Data deleted successfully!" }), { status: 200 });
      } catch (error) {
        if (client) await client.query("ROLLBACK");
        console.error("Error deleting data:", error);
        return new Response(JSON.stringify({ message: "Error deleting data" }), { status: 500 });
      } finally {
        if (client) client.release();
      }
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
  }
  