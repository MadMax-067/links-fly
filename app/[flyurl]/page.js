import { redirect } from "next/navigation"
import clientPromise from "@/app/lib/mongodb";

export default async function Page({ params }) {
    const flyurl = (await params).flyurl
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("links-fly");
    const collection = db.collection("url");

    const existingDoc = await collection.findOne({ flyurl });
    if (existingDoc) {
        redirect(existingDoc.url)
    }
    else {
        redirect(process.env.NEXT_PUBLIC_HOST)
    }
}