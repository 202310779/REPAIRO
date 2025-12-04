import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TechnicianClient from "./TechnicianClient";

// Force dynamic rendering for authenticated pages
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Technician Dashboard — Repairo",
  description: "Manage your assigned repair jobs",
};

export default async function TechnicianPage() {
  // Server-side auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login?redirect=/technician");
  }

  // Fetch initial assigned jobs on server
  let initialJobs = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/repairs`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (response.ok) {
      initialJobs = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch initial jobs:", error);
    // Continue with empty array - client will use fallback data
  }

  return <TechnicianClient initialJobs={initialJobs} />;
}
