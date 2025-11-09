import clientPromise from "@/src/services/mongoClient";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("repairo");
    const items = await db.collection("repairs").find({}).limit(20).toArray();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}