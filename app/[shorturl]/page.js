import { redirect } from "next/navigation";
import clientPromise from "@/app/lib/mongodb";

export default async function Page({ params }) {
    const { shorturl } = await params;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("links-fly");
    const collection = db.collection("url");

    // Fetch the document corresponding to the short URL
    const existingDoc = await collection.findOne({ flyurl: shorturl });

    // If the document is found, redirect to the original URL
    if (existingDoc) {
        redirect(existingDoc.url);
    } else {
        // If not found, redirect to the homepage (or another fallback URL)
        redirect(process.env.NEXT_PUBLIC_HOST);
    }
}
