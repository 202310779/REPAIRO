"use client";
import { endpoints } from "../constants/api";
import { useApi } from "./useApi";

const fallbackAssigned = [
  {
    id: 101,
    client: "Jane Doe",
    device: "Phone • iPhone 12",
    issue: "Screen crack",
    status: "In Progress",
    date: "2025-11-01",
  },
  {
    id: 102,
    client: "Mike Ross",
    device: "Laptop • XPS 13",
    issue: "Battery issue",
    status: "Pending",
    date: "2025-11-03",
  },
  {
    id: 103,
    client: "Nina Park",
    device: "Tablet • iPad",
    issue: "Charging port",
    status: "Pending",
    date: "2025-11-04",
  },
];

export default function useAssignedJobs() {
  // Try to fetch from API; if it 404s locally, just use fallback in the page
  const api = useApi({
    endpoint: endpoints.technician.assigned,
    immediate: true,
  });
  // We don't inject fallback here to keep the hook pure; consumer can decide.
  return { ...api, fallback: fallbackAssigned };
}
