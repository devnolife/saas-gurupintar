import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/schools/[id] - Get a specific school
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const school = await prisma.school.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            teachers: true,
            students: true,
            operators: true,
            headmasters: true,
          },
        },
      },
    })

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    return NextResponse.json(school)
  } catch (error) {
    console.error("Error fetching school:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}

// PUT /api/schools/[id] - Update a school
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Check if school exists
    const existingSchool = await prisma.school.findUnique({
      where: { id: params.id },
    })

    if (!existingSchool) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    // Update school
    const school = await prisma.school.update({
      where: { id: params.id },
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        phone: body.phone,
        email: body.email,
        website: body.website,
        principalName: body.principalName,
        foundedYear: body.foundedYear ? Number.parseInt(body.foundedYear) : null,
        type: body.type,
        accreditation: body.accreditation,
        status: body.status,
      },
    })

    return NextResponse.json(school)
  } catch (error) {
    console.error("Error updating school:", error)
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 })
  }
}

// DELETE /api/schools/[id] - Delete a school
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if school exists
    const existingSchool = await prisma.school.findUnique({
      where: { id: params.id },
    })

    if (!existingSchool) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    // Delete school
    await prisma.school.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "School deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting school:", error)
    return NextResponse.json({ error: "Failed to delete school" }, { status: 500 })
  }
}

