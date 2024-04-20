import { connectToDatabase } from "@/lib/dbconnect";
import { getResponseError, getResponseOK } from "@/utils/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const dbMaster = await connectToDatabase();

  if (!dbMaster.db) {
    return Response.json({ message: "DB connection Error" }, { status: 506 });
  }

  try {
    const result = await dbMaster.db.collection("todo").find().toArray();

    return Response.json(
      getResponseOK({ message: "success - Get image list", result }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      getResponseError({
        message: "success - Get image list",
        result: undefined,
      }),
      { status: 500 }
    );
  }
}
