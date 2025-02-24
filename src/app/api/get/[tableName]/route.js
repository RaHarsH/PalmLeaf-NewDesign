import { NextResponse } from "next/server";
import { pool } from "@/utils/db";

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

export async function GET(request, {params}) {
  const { tableName } = params;

  if (!tableName || !allowedTables.includes(tableName)) {
    return NextResponse.json({ error: "Invalid or unauthorized table" }, { status: 400 });
  }

  try {
    const query = `SELECT * FROM "${tableName}";`;
    const result = await pool.query(query);

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
