import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("links-fly");

        // Test the connection by listing collections or retrieving data
        const collections = await db.listCollections().toArray();

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Connected to MongoDB successfully!",
                collections: collections.map((c) => c.name), // List collection names
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        // Return error response
        console.error("MongoDB connection failed:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to connect to MongoDB",
                error: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
