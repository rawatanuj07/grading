// pages/api/calculatePersonality.js
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Assuming you have the necessary data in req.body
export async function POST(req: NextRequest, res: NextResponse) {
  console.log("connected to db succesfuly 1");

  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("grades");
    const collection = database.collection("personality");
    await client.connect();
    console.log("connected to db succesfuly");
    //   const invoiceNums = await request.text();
    //   let psuhb = await JSON.parse(invoiceNums);
    console.log(req.body);
    const requestBody = await req.json();
    console.log("req Body is", requestBody);
    const { subject1, subject2, subject3, subject4 } = requestBody;
    console.log("subject1Marks is", subject1);

    // Calculate the average marks across all four subjects
    const averageMarks = (subject1 + subject2 + subject3 + subject4) / 4;

    let grade;
    if (averageMarks >= 0 && averageMarks <= 29) {
      grade = "D";
    } else if (averageMarks >= 30 && averageMarks <= 50) {
      grade = "C";
    } else if (averageMarks >= 51 && averageMarks <= 70) {
      grade = "B";
    } else if (averageMarks >= 71 && averageMarks <= 90) {
      grade = "A";
    } else if (averageMarks === 100) {
      grade = "O";
    }

    // Perform a direct comparison
    let personalityTrait;
    console.log("average Marks is", averageMarks);
    if (averageMarks >= 0 && averageMarks <= 29) {
      personalityTrait = "Personality-D";
    } else if (averageMarks >= 30 && averageMarks <= 50) {
      personalityTrait = "Personality-C";
    } else if (averageMarks >= 51 && averageMarks <= 70) {
      personalityTrait = "Personality-B";
    } else if (averageMarks >= 71 && averageMarks <= 90) {
      personalityTrait = "Personality-A";
    } else if (averageMarks === 100) {
      personalityTrait = "Personality-O";
    }

    return NextResponse.json({ personalityTrait, grade });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
