import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const { db } = await connectToDatabase();
  const hashedPassword = await hashPassword(password);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: "operator",
  };

  const result = await db.collection("users").insertOne(newUser);

  if (result.acknowledged) {
    return NextResponse.json({ success: true, message: "Operator registered successfully" });
  } else {
    return NextResponse.json({ success: false, message: "Failed to register operator" }, { status: 500 });
  }
}
