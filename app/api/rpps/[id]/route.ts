import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/rpps/[id] - Get a specific RPP
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rpp = await prisma.rPP.findUnique({
      where: { id: params.id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        teacher: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
                avatar: true,
              },
            },
            school: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!rpp) {
      return NextResponse.json({ error: "RPP not found" }, { status: 404 })
    }

    return NextResponse.json(rpp)
  } catch (error) {
    console.error("Error fetching RPP:", error)
    return NextResponse.json({ error: "Failed to fetch RPP" }, { status: 500 })
  }
}

// PUT /api/rpps/[id] - Update an RPP
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Check if RPP exists
    const existingRPP = await prisma.rPP.findUnique({
      where: { id: params.id },
    })

    if (!existingRPP) {
      return NextResponse.json({ error: "RPP not found" }, { status: 404 })
    }

    // Update RPP
    const rpp = await prisma.rPP.update({
      where: { id: params.id },
      data: {
        title: body.title,
        subject: body.subject,
        grade: body.grade,
        duration: body.duration,
        identitasModule: body.identitasModule,
        kompetensiAwal: body.kompetensiAwal,
        profilPelajarPancasila: body.profilPelajarPancasila,
        saranaPrasarana: body.saranaPrasarana,
        targetPesertaDidik: body.targetPesertaDidik,
        modelPembelajaran: body.modelPembelajaran,
        learningObjectives: body.learningObjectives || existingRPP.learningObjectives,
        assessment: body.assessment,
        refleksiGuru: body.refleksiGuru,
        refleksiPesertaDidik: body.refleksiPesertaDidik,
        pengayaanRemedial: body.pengayaanRemedial,
        bahanBacaan: body.bahanBacaan,
        glosarium: body.glosarium,
        status: body.status,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        teacher: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(rpp)
  } catch (error) {
    console.error("Error updating RPP:", error)
    return NextResponse.json({ error: "Failed to update RPP" }, { status: 500 })
  }
}

// DELETE /api/rpps/[id] - Delete an RPP
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if RPP exists
    const existingRPP = await prisma.rPP.findUnique({
      where: { id: params.id },
    })

    if (!existingRPP) {
      return NextResponse.json({ error: "RPP not found" }, { status: 404 })
    }

    // Delete RPP
    await prisma.rPP.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "RPP deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting RPP:", error)
    return NextResponse.json({ error: "Failed to delete RPP" }, { status: 500 })
  }
}

