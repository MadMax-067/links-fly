import clientPromise from "@/app/lib/mongodb";

// Function to generate a random short string
function generateFlyurl(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();

        // Check if the URL is provided
        if (!body.url) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: true,
                    message: "'url' is required",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db("links-fly");
        const collection = db.collection("url");

        // Ensure unique index on flyurl
        await collection.createIndex({ flyurl: 1 }, { unique: true });

        // Generate and insert unique flyurl
        let flyurl = generateFlyurl();

        try {
            await collection.insertOne({
                url: body.url,
                flyurl,
            });
        } catch (error) {
            if (error.code === 11000) {
                // Handle duplicate key error (retry once)
                flyurl = generateFlyurl();
                await collection.insertOne({
                    url: body.url,
                    flyurl,
                });
            } else {
                throw error; // Propagate other errors
            }
        }

        // Return a success response with the generated flyurl
        return new Response(
            JSON.stringify({
                success: true,
                error: false,
                message: "URL Shortened Successfully",
                flyurl,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error occurred:", error.message, error.stack);

        return new Response(
            JSON.stringify({
                success: false,
                error: true,
                message: error.message || "Failed to shorten URL",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}