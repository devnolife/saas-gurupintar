import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  const { schoolName, teacherCount, package: selectedPackage } = await request.json();

  const { db } = await connectToDatabase();

  const confirmationData = {
    schoolName,
    teacherCount,
    package: selectedPackage,
  };

  const result = await db.collection("confirmations").insertOne(confirmationData);

  if (result.acknowledged) {
    return NextResponse.json({ success: true, message: "Confirmation data saved successfully" });
  } else {
    return NextResponse.json({ success: false, message: "Failed to save confirmation data" }, { status: 500 });
  }
}
