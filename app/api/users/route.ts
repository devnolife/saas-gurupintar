import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { school: true },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, role, schoolId } = await request.json()
    const user = await prisma.user.create({
      data: { name, email, password, role, schoolId },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 })
  }
}

