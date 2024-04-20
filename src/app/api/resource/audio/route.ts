import { getResponseError } from "@/utils/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const request = await req.json();
  try {
  } catch (err) {
    return Response.json(
      getResponseError({ message: "PostUploadAudio fail", result: undefined }),
      { status: 500 }
    );
  }
}
