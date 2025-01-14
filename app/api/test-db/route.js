import { MongoClient } from "mongodb";

export async function GET(req) {
    try {
        // Read the MongoDB URI from environment variables
        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "MONGODB_URI is not set in environment variables.",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Attempt to connect to MongoDB
        const client = new MongoClient(mongodbUri);
        await client.connect();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successfully connected to MongoDB!",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to connect to MongoDB.",
                error: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
