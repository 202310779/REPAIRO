// src/app/api/auth/login/route.js
import clientPromise from "../../../../services/mongoClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET = "", JWT_EXPIRES_IN = "7d" } = process.env;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("repairo");
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Build token payload (exclude sensitive fields)
    const payload = {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Safe user shape to send back
    const safeUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return new Response(JSON.stringify({ token, user: safeUser }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
