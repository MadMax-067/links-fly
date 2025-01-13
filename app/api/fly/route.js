import clientPromise from "@/app/lib/mongodb";

// Function to generate a random short string
function generateFlyurl(length = 6) {
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
        console.log(await clientPromise);

        // Generate a unique random flyurl
        let flyurl;
        let isUnique = false;

        while (!isUnique) {
            flyurl = generateFlyurl(); // Generate a random string
            const existingDoc = await collection.findOne({ flyurl });
            if (!existingDoc) isUnique = true; // Exit loop if unique
        }

        // Insert the data into MongoDB
        const result = await collection.insertOne({
            url: body.url,
            flyurl,
        });

        // Return a success response with the generated flyurl
        return new Response(
            JSON.stringify({
                success: true,
                error: false,
                message: "URL Shortened Successfully",
                flyurl, // Include the generated flyurl in the response
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: true,
                message: "Failed to shorten URL",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
