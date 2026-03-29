import { NextResponse } from "next/server";
import { sampleCommitments } from "@/lib/sample-data";

export async function GET() {
  return NextResponse.json(sampleCommitments);
}
