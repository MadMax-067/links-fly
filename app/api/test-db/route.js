export async function GET(req) {
    try {
        const mongodbUri = process.env.MONGODB_URI;

        // Check if MONGODB_URI exists
        if (!mongodbUri) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "MONGODB_URI is not set in environment variables.",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "MONGODB_URI is set and readable.",
                uri: mongodbUri,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred while checking MONGODB_URI.",
                error: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
