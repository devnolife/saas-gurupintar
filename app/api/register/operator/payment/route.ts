import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  const { paymentMethod, cardDetails } = await request.json();

  const { db } = await connectToDatabase();

  const paymentData = {
    paymentMethod,
    cardDetails,
  };

  const result = await db.collection("payments").insertOne(paymentData);

  if (result.acknowledged) {
    return NextResponse.json({ success: true, message: "Payment data saved successfully" });
  } else {
    return NextResponse.json({ success: false, message: "Failed to save payment data" }, { status: 500 });
  }
}
