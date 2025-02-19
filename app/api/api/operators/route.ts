import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const operators = await prisma.user.findMany({
      where: { role: "OPERATOR" },
      include: { school: true },
    })
    return NextResponse.json(operators)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching operators" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, schoolId } = await request.json()
    const operator = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, ensure this is hashed
        role: "OPERATOR",
        schoolId,
      },
    })
    return NextResponse.json(operator)
  } catch (error) {
    return NextResponse.json({ error: "Error creating operator" }, { status: 500 })
  }
}

