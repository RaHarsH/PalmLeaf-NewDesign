import { NextResponse } from "next/server";
import { pool } from "@/utils/db";

// Allowed tables for security
const allowedTables = [
  "language",
  "granthatype",
  "granthadeck",
  "author",
  "location",
  "grantha",
  "granthalanguage",
  "storagemechanism",
  "physicalcondition",
  "conservationhistory",
  "scanningproperties",
  "scannedimage",
  "digitalfile",
  "bundle",
  "accesscontrol",
  "subworks",
];

// PATCH API: Updates multiple tables in one request
export async function PATCH(request) {
  const reqBody = await request.json();

  // Validate request structure
  if (!Array.isArray(reqBody) || reqBody.length === 0) {
    return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
  }

  const client = await pool.connect(); // Get a database connection
  
  try {
    await client.query("BEGIN"); // Start a transaction

    const updateResults = [];

    for (const update of reqBody) {
      const { tableName, data } = update;

      if (!allowedTables.includes(tableName)) {
        throw new Error(`Invalid table: ${tableName}`);
      }

      // Extract ID field dynamically
      const idField = Object.keys(data).find((key) => key.endsWith("_id"));
      if (!idField || !data[idField]) {
        throw new Error(`Missing valid ID field for table: ${tableName}`);
      }

      const idValue = data[idField]; // ID for WHERE clause
      delete data[idField]; // Remove ID from update fields

      // Ensure at least one field is provided for update
      if (Object.keys(data).length === 0) {
        throw new Error(`No fields provided for update in table: ${tableName}`);
      }

      // Construct dynamic UPDATE query
      const setClauses = Object.keys(data)
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ");

      const values = Object.values(data);
      values.push(idValue); // Add ID as last parameter

      const query = `UPDATE "${tableName}" SET ${setClauses} WHERE "${idField}" = $${values.length} RETURNING *;`;

      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        throw new Error(`No record found in table ${tableName} with ${idField} = ${idValue}`);
      }

      updateResults.push({ tableName, updatedRow: result.rows[0] });
    }

    await client.query("COMMIT"); // Commit transaction

    return NextResponse.json({ message: "Updates successful", updates: updateResults });
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback on error
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release(); // Release database connection
  }
}
