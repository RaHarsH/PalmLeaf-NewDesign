import { pool, testConnection } from "@/utils/db"; // Import the pool instance

export async function POST(request) {
  try {
    const isConnected = await testConnection();
    console.log(isConnected);

    if (!isConnected) {
      return new Response(
        JSON.stringify({ message: "Database connection failed" }),
        { status: 500 }
      );
    }
    const { tableName, data } = await request.json();

    // Validate tableName and data
    if (!tableName || !data || !Array.isArray(data)) {
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

    // Check if the table name is valid
    if (!allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ message: "Invalid table name" }), { status: 400 });
    }

    // Constructing the query dynamically based on tableName and data
    const columns = Object.keys(data[0]);
    const values = data.map((item) => `(${columns.map((_, i) => `$${i + 1}`).join(", ")})`).join(", ");
    const sql = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES ${values}`;

    console.log(`Columns: ${columns}`);
    console.log(`Values: ${values}`);
    console.log(`SQL query: ${sql}`);

    const flattenedValues = data.flatMap((item) => Object.values(item));

    console.log(`flattenedValues: ${flattenedValues}`);

    
    let client;
    try {
      client = await pool.connect();
      await client.query("BEGIN");

      await client.query(sql, flattenedValues);

      await client.query("COMMIT");
      return new Response(JSON.stringify({ message: "Data inserted successfully!" }), { status: 200 });
    } catch (error) {
      if (client) await client.query("ROLLBACK");
      console.error("Error inserting data:", error);
      return new Response(JSON.stringify({ message: "Error inserting data" }), { status: 500 });
    } finally {
      if (client) client.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
