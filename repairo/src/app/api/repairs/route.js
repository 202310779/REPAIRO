import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import mongoose from "mongoose";


export async function GET() {
  try {
    await connectDB();
    
    const items = await Repair.find({})
      .limit(20)
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error('Repairs GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}