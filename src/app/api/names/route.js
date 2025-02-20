import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // Ensures the API always runs on the server

const JSONBIN_URL = process.env.NEXT_PUBLIC_JSONBIN_URL;
const API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY; // Store in .env file

export async function GET() {
    try {
        console.log("Fetching data from:", JSONBIN_URL);

        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": API_KEY },
        });

        if (!response.ok) throw new Error("Failed to fetch names");

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging

        return Response.json(data.record.records || []);
    } catch (error) {
        console.error("Error fetching names:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name } = await req.json();

        if (!name) throw new Error("Name is required");

        // Fetch existing names
        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": API_KEY },
        });

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging

        // Extract existing names array
        const existingNames = Array.isArray(data.record.records) ? data.record.records : [];

        // Prevent duplicate names
        if (existingNames.includes(name)) {
            return Response.json({ message: "Name already exists" });
        }

        // Append the new name
        const updatedData = { record: { records: [...existingNames, name] } };

        // Update JSONBin
        const updateResponse = await fetch(JSONBIN_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
            },
            body: JSON.stringify(updatedData),
        });

        if (!updateResponse.ok) throw new Error("Failed to update names");

        // Set a cookie in the user's browser
        cookies().set("username", name, { path: "/", maxAge: 60 * 60 * 24 * 7 });

        return Response.json({ message: "Name added successfully" });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
