import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/teachers/[id] - Get a specific teacher
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            avatar: true,
            phone: true,
            address: true,
            bio: true,
            lastActive: true,
            createdAt: true,
          },
        },
        school: {
          select: {
            id: true,
            name: true,
            city: true,
            province: true,
          },
        },
        classes: true,
        rpps: {
          select: {
            id: true,
            title: true,
            subject: true,
            grade: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    })

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
    }

    return NextResponse.json(teacher)
  } catch (error) {
    console.error("Error fetching teacher:", error)
    return NextResponse.json({ error: "Failed to fetch teacher" }, { status: 500 })
  }
}

// PUT /api/teachers/[id] - Update a teacher
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!existingTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
    }

    // Update teacher and user in a transaction
    const teacher = await prisma.$transaction(async (tx) => {
      // Update user
      await tx.user.update({
        where: { id: existingTeacher.userId },
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          address: body.address,
          bio: body.bio,
          avatar: body.avatar,
          status: body.status,
        },
      })

      // Update teacher profile
      const teacher = await tx.teacher.update({
        where: { id: params.id },
        data: {
          subject: body.subject,
          qualification: body.qualification,
          experience: body.experience ? Number.parseInt(body.experience) : null,
          schoolId: body.schoolId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
              avatar: true,
              phone: true,
              address: true,
              bio: true,
            },
          },
          school: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return teacher
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.error("Error updating teacher:", error)
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 })
  }
}

// DELETE /api/teachers/[id] - Delete a teacher
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!existingTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 })
    }

    // Delete teacher and user in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete teacher profile
      await tx.teacher.delete({
        where: { id: params.id },
      })

      // Delete user
      await tx.user.delete({
        where: { id: existingTeacher.userId },
      })
    })

    return NextResponse.json({ message: "Teacher deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting teacher:", error)
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 })
  }
}

