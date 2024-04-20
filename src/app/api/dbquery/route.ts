import { connectToDatabase } from "@/lib/dbconnect";
import { getResponseError, getResponseOK } from "@/utils/service";
import { NextRequest, NextResponse } from "next/server";

function getRandomValue(round: number) {
  return Math.floor(Math.random() * round) > 1
    ? Math.floor(Math.random() * round)
    : 1;
}

const likeArray = ["LIKE", "DISLIKE", "NONE"];

const langTypeArray = ["KOR", "CHI", "ENG", "RUS", "SPA", "IND", "THA"];

function getRandomLike() {
  const newVal = getRandomValue(3);
  return likeArray[newVal];
}

function getRandomLang() {
  const newVal = getRandomValue(langTypeArray.length);
  return langTypeArray[newVal];
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // ERROR: 데이터베이스 연결 확인
    const dbMaster = await connectToDatabase();
    if (!dbMaster.db) {
      return Response.json({ message: "DB connection Error" }, { status: 506 });
    }

    const newData = {
      langType: getRandomLang(),
      code: `NPS_CODE_${getRandomValue(10)}`,
      like: getRandomLike(),
      regDate: new Date(),
    };

    const dbRes = await dbMaster.db.collection("dbquery").insertOne(newData);
    if (dbRes.acknowledged) {
      return Response.json(
        getResponseOK({ message: "Post Upload image success", result: true })
      );
    }
  } catch (err) {
    console.log("error", err);
    return Response.json(
      getResponseError({ message: "PostUploadAudio fail", result: undefined }),
      { status: 500 }
    );
  }
}

function calculateLike(arr: string[]) {
  let likeCnt = 0;
  let dislikeCnt = 0;
  let noneCnt = 0;
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case "LIKE":
        ++likeCnt;
        break;
      case "DISLIKE":
        ++dislikeCnt;
        break;
      default:
        ++noneCnt;
    }
  }
  return { like: likeCnt, dislike: dislikeCnt, none: noneCnt };
}

export async function GET(req: NextRequest, res: NextResponse) {
  // const request = await req.json();
  // const {} = request;
  try {
    const dbMaster = await connectToDatabase();
    if (!dbMaster.db) {
      return Response.json({ message: "DB connection Error" }, { status: 506 });
    }
    const dbRes = await dbMaster.db.collection("dbquery").find().toArray();
    const data = await dbMaster.db
      .collection("dbquery")
      .aggregate([
        {
          $group: {
            _id: "$code",
            count: { $sum: 1 },
            likeness: {
              $push: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$like", "LIKE"] }, then: "LIKE" },
                    { case: { $eq: ["$like", "DISLIKE"] }, then: "DISLIKE" },
                  ],
                  default: "NONE",
                },
              },
            },
          },
        },
      ])
      .toArray();
    console.log("data", data);

    const result = data.map((item) => {
      const likeRes = calculateLike(item.likeness);
      return {
        code: item._id,
        count: item.count,
        like: likeRes.like,
        dislike: likeRes.dislike,
        none: likeRes.none,
      };
    });

    return Response.json(
      getResponseOK({ message: "Post Upload image success", result })
    );
  } catch (err) {
    console.log("error", err);
    return Response.json(
      getResponseError({ message: "PostUploadAudio fail", result: undefined }),
      { status: 500 }
    );
  }
}
