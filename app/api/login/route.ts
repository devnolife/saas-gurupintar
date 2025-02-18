import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const { db } = await connectToDatabase()
  const user = await db.collection("users").findOne({ username })

  if (user && await bcrypt.compare(password, user.password)) {
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  }

  return NextResponse.json({ success: false, message: "Nama pengguna atau kata sandi tidak valid" }, { status: 401 })
}
