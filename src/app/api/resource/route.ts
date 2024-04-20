import { connectToDatabase } from "@/lib/dbconnect";
import { getResponseError, getResponseOK } from "@/utils/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  console.log("searchParams", searchParams);

  const resourceType = searchParams.get("resourceType") as string;

  // ERROR: request 요청값 확인
  if (!resourceType) {
    return Response.json(
      { message: "resourceType is undefined" },
      { status: 400 }
    );
  }

  // ERROR: 데이터베이스 연결 확인
  const dbMaster = await connectToDatabase();
  if (!dbMaster.db) {
    return Response.json({ message: "DB connection Error" }, { status: 506 });
  }

  try {
    const result = await dbMaster.db
      .collection("resource")
      .find({ resourceType })
      .toArray();
    console.log("dbRes", result);

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
