import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { canGenerateDocument } from "@/lib/subscriptionUtils"

export async function POST(request: Request) {
  try {
    const syllabusData = await request.json()
    const { authorId, ...rest } = syllabusData

    // Verify that the author is a teacher
    const teacher = await prisma.user.findFirst({
      where: { id: authorId, role: "TEACHER" },
    })

    if (!teacher) {
      return NextResponse.json({ error: "Only teachers can create syllabi" }, { status: 403 })
    }

    // Check if the teacher can generate a syllabus
    const canGenerate = await canGenerateDocument(authorId, "Syllabus")
    if (!canGenerate) {
      return NextResponse.json({ error: "Syllabus generation limit reached for this month" }, { status: 403 })
    }

    const syllabus = await prisma.syllabus.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
      },
    })
    return NextResponse.json(syllabus)
  } catch (error) {
    return NextResponse.json({ error: "Error creating syllabus" }, { status: 500 })
  }
}

