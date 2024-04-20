import { ServerPathImage } from "@/constant/path";
import { connectToDatabase } from "@/lib/dbconnect";
import { getResponseError, getResponseOK } from "@/utils/service";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { fileToBase64 } from "@/utils/format";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  console.log("formdata", formData);

  const imageFile = formData.get("imageFile") as File;
  console.log("imageFile", imageFile);

  if (!imageFile) {
    return Response.json({ message: "DB connection Error" }, { status: 400 });
  }
  const fileName = imageFile.name;
  const fileType = imageFile.type;
  const fileSize = imageFile.size;
  // const displayName = formData.get("displayName") as string;

  try {
    // ERROR: formdata 요청값 확인

    const imagePath = path.join(process.cwd(), ServerPathImage, fileName);

    console.log("imagePath", imagePath);

    const imageData = await fileToBase64(imageFile);

    console.log("imageData", imageData.length);

    fs.writeFileSync(imagePath, imageData, "base64");

    // ERROR: 데이터베이스 연결 확인
    const dbMaster = await connectToDatabase();
    if (!dbMaster.db) {
      return Response.json({ message: "DB connection Error" }, { status: 506 });
    }

    const dbRes = await dbMaster.db.collection("resource").insertOne({
      fileName,
      fileType,
      fileSize,
      regDate: new Date(),
      resourceType: "image",
    });

    console.log("dbRes", dbRes);

    if (dbRes.acknowledged) {
      return Response.json(
        getResponseOK({ message: "Post Upload image success", result: true })
      );
    }
  } catch (err) {
    console.log("err", err);
    return Response.json(
      getResponseError({ message: "PostUploadImage fail", result: undefined }),
      { status: 500 }
    );
  }
}
