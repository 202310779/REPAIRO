// src/app/api/auth/login/route.js
// import clientPromise from "../../../../services/mongoClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../../lib/mongo";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

const { JWT_SECRET = "", JWT_EXPIRES_IN = "7d" } = process.env;

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Build token payload (exclude sensitive fields)
    const payload = {
      sub: String(user._id),
      email: user.email,
      role: user.role || "user",
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Safe user shape to send back
    const safeUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "user",
    };

    return NextResponse.json({ token, user: safeUser }, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
