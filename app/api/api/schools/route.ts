import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: { users: true },
    })
    return NextResponse.json(schools)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching schools" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, address, principalName } = await request.json()
    const school = await prisma.school.create({
      data: { name, address, principalName },
    })
    return NextResponse.json(school)
  } catch (error) {
    return NextResponse.json({ error: "Error creating school" }, { status: 500 })
  }
}

