import { pool, testConnection } from "@/utils/db";

export async function PATCH(request) {
    try {
        const isConnected = await testConnection();
        console.log(isConnected);
    
        if (!isConnected) {
          return new Response(
            JSON.stringify({ message: "Database connection failed" }),
            { status: 500 }
          );
        }
    
        const { tableName, id, data } = await request.json();
    
        // Validate inputs
        if (!tableName || !id || !data || typeof data !== "object") {
          return new Response(JSON.stringify({ message: "Invalid request body" }), {
            status: 400,
          });
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
          return new Response(JSON.stringify({ message: "Invalid table name" }), {
            status: 400,
          });
        }
    
        const columns = Object.keys(data);
    
        // If no fields are provided to update, return an error
        if (columns.length === 0) {
          return new Response(
            JSON.stringify({ message: "No fields provided to update" }),
            { status: 400 }
          );
        }
    
        const setClause = columns
          .map((col, index) => `${col} = $${index + 1}`)
          .join(", ");
        const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = $${
          columns.length + 1
        }`;
    
        const values = [...Object.values(data), id];
    
        console.log(`SQL query: ${sql}`);
        console.log(`Values: ${values}`);
    
        let client;
        try {
          client = await pool.connect();
          await client.query("BEGIN");
    
          await client.query(sql, values);
    
          await client.query("COMMIT");
          return new Response(
            JSON.stringify({ message: "Data updated successfully!" }),
            { status: 200 }
          );
        } catch (error) {
          if (client) await client.query("ROLLBACK");
          console.error("Error updating data:", error);
          return new Response(
            JSON.stringify({ message: "Error updating data" }),
            { status: 500 }
          );
        } finally {
          if (client) client.release();
        }
      } catch (error) {
        console.error("Error:", error);
        return new Response(
          JSON.stringify({ message: "Internal server error" }),
          { status: 500 }
        );
      }
  }
  