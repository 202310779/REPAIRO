// src/app/api/auth/profile/route.js
import clientPromise from "../../../../services/mongoClient";
import jwt from "jsonwebtoken";

const { JWT_SECRET = "" } = process.env;

export async function GET(request) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 401,
      });
    }
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const client = await clientPromise;
    const db = client.db("repairo");
    const user = await db.collection("users").findOne({ email: payload.email });
    if (!user)
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });

    const safeUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return new Response(JSON.stringify({ user: safeUser }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
