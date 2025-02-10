/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import users from "../../data/users.json"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const user = users.find((u) => u.name === username)
  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  }

  return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
}

