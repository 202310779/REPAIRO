import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Repair from "@/models/repair";
import mongoose from "mongoose";

// Force dynamic rendering for API routes
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    await connectDB();

    // Get user info from middleware headers
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    let query = {};

    // Filter based on user role
    if (userRole === "technician" && userId) {
      query.technicianId = userId;
    } else if (userRole === "user" && userId) {
      query.userId = userId;
    }

    const items = await Repair.find(query)
      .populate("userId", "username email")
      .populate("technicianId", "username email phone")
      .limit(50)
      .sort({ createdAt: -1 })
      .lean();

    // Add cache control headers
    const response = NextResponse.json(items, { status: 200 });
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (err) {
    console.error("Repairs GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const userId = request.headers.get("X-User-Id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, status = "Pending" } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRepair = new Repair({
      title,
      description,
      status,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newRepair.save();

    return NextResponse.json(newRepair, { status: 201 });
  } catch (err) {
    console.error("Repairs POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
