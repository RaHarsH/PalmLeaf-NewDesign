// This route is for updating only single selected table

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

export async function PATCH(request, { params }) {
  const { tableName } = params;
  const reqBody = await request.json();

  // Validate if the table name is allowed
  if (!allowedTables.includes(tableName)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  // Special handling for granthalanguage where both grantha_id and language_id need to be updated (both are foreign keys)
  if (
    tableName === "granthalanguage" &&
    (!reqBody.old_grantha_id ||
      !reqBody.old_language_id ||
      !reqBody.new_grantha_id ||
      !reqBody.new_language_id)
  ) {
    return NextResponse.json(
      { error: "Both old and new grantha_id and language_id are required" },
      { status: 400 }
    );
  }

  try {
    let query, values;

    if (tableName === "granthalanguage") {
      // Special case: Update both grantha_id and language_id
      query = `
        UPDATE "${tableName}" 
        SET "grantha_id" = $1, "language_id" = $2
        WHERE "grantha_id" = $3 AND "language_id" = $4
        RETURNING *;
      `;

      values = [
        reqBody.new_grantha_id,
        reqBody.new_language_id,
        reqBody.old_grantha_id,
        reqBody.old_language_id,
      ];
    } else {
      // Generic case: Extract ID field dynamically
      const idField = Object.keys(reqBody).find((key) => key.endsWith("_id"));

      if (!idField || !reqBody[idField]) {
        return NextResponse.json(
          { error: "Missing valid ID field" },
          { status: 400 }
        );
      }

      const idValue = reqBody[idField];
      delete reqBody[idField]; // Remove ID from update fields

      // Ensure at least one field is provided for update
      if (Object.keys(reqBody).length === 0) {
        return NextResponse.json(
          { error: "No fields provided for update" },
          { status: 400 }
        );
      }

      // Construct dynamic UPDATE query
      const setClauses = Object.keys(reqBody)
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ");

      values = Object.values(reqBody);
      values.push(idValue); // Add ID as last parameter

      query = `UPDATE "${tableName}" SET ${setClauses} WHERE "${idField}" = $${values.length} RETURNING *;`;
    }

    // Execute the query
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Update successful",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
