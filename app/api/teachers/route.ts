import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      include: { school: true },
    })
    return NextResponse.json(teachers)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching teachers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, schoolId } = await request.json()
    const teacher = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, ensure this is hashed
        role: "TEACHER",
        schoolId,
      },
    })
    return NextResponse.json(teacher)
  } catch (error) {
    return NextResponse.json({ error: "Error creating teacher" }, { status: 500 })
  }
}

