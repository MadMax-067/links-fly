export default async function handler(req, res) {
    try {
        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            return res.status(400).json({
                success: false,
                message: "MONGODB_URI is not set in the environment variables.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "MONGODB_URI is set correctly.",
            uri: mongodbUri, // For security, avoid returning the full URI in production
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while checking MONGODB_URI.",
            error: error.message,
        });
    }
}
