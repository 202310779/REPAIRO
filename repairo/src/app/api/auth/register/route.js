import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongo";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../models/user";

const { JWT_SECRET = "", JWT_EXPIRES_IN = "7d" } = process.env;

export async function POST(request) {
  try {
    await connectDB();
    const { email, username, password, confirmPassword } = await request.json();

    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if(email.length < 5 || password.length < 8 || username.length < 3) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if(email.length > 100 || username.length > 50 || password.length > 100) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    if(password !== confirmPassword) {
        return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token for auto-login after registration
    const payload = {
      sub: String(newUser._id),
      email: newUser.email,
      role: newUser.role || "user",
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Safe user shape to send back
    const safeUser = {
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role || "user",
    };

    return NextResponse.json({ token, user: safeUser, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
