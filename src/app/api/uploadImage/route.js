import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import os from "os";

// Function to dynamically determine a root directory
async function getRootDirectory() {
  const possibleRoots = ["C:", "D:", "E:"]; // Adjust based on system preference
  for (const drive of possibleRoots) {
    try {
      await fs.access(drive); // Check if drive exists
      return drive;
    } catch (error) {
      continue; // Try the next drive
    }
  }
  return process.cwd(); // Fallback to the current working directory
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine dynamic root directory
    const rootDirectory = await getRootDirectory();

    // Define upload path in system storage
    const uploadDir = path.join(rootDirectory, "uploads", "images");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a unique filename to prevent conflicts
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `image_${timestamp}${fileExtension}`;
    const systemFilePath = path.join(uploadDir, uniqueFilename);

    // Write file to disk
    await fs.writeFile(systemFilePath, buffer);

    // Provide both absolute and relative paths
    return NextResponse.json(
      { message: "File uploaded", systemPath: systemFilePath, relativePath: `/uploads/images/${uniqueFilename}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };
