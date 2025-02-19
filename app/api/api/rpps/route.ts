import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { canGenerateDocument } from "@/lib/subscriptionUtils"

export async function POST(request: Request) {
  try {
    const rppData = await request.json()
    const { authorId, ...rest } = rppData

    // Verify that the author is a teacher
    const teacher = await prisma.user.findFirst({
      where: { id: authorId, role: "TEACHER" },
    })

    if (!teacher) {
      return NextResponse.json({ error: "Only teachers can create RPPs" }, { status: 403 })
    }

    // Check if the teacher can generate an RPP
    const canGenerate = await canGenerateDocument(authorId, "RPP")
    if (!canGenerate) {
      return NextResponse.json({ error: "RPP generation limit reached for this month" }, { status: 403 })
    }

    const rpp = await prisma.rPP.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
      },
    })
    return NextResponse.json(rpp)
  } catch (error) {
    return NextResponse.json({ error: "Error creating RPP" }, { status: 500 })
  }
}

