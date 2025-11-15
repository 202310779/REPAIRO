// src/app/api/auth/profile/route.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/user";

const { JWT_SECRET = "" } = process.env;

export async function GET(request) {
  try {
    await connectDB();
    
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "");
    
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const safeUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "user",
    };
    
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (err) {
    console.error('Profile error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
