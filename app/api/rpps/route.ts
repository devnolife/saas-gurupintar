import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/rpps - Get all RPPs with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const subject = searchParams.get("subject") || undefined
    const grade = searchParams.get("grade") || undefined
    const status = searchParams.get("status") || undefined
    const creatorId = searchParams.get("creatorId") || undefined
    const search = searchParams.get("search") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (subject) {
      where.subject = subject
    }

    if (grade) {
      where.grade = grade
    }

    if (status) {
      where.status = status
    }

    if (creatorId) {
      where.creatorId = creatorId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
      ]
    }

    // Execute query with count
    const [rpps, total] = await Promise.all([
      prisma.rPP.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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
      }),
      prisma.rPP.count({ where }),
    ])

    return NextResponse.json({
      rpps,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching RPPs:", error)
    return NextResponse.json({ error: "Failed to fetch RPPs" }, { status: 500 })
  }
}

// POST /api/rpps - Create a new RPP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.title || !body.subject || !body.grade || !body.creatorId || !body.teacherId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create RPP
    const rpp = await prisma.rPP.create({
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
        learningObjectives: body.learningObjectives || [],
        assessment: body.assessment,
        refleksiGuru: body.refleksiGuru,
        refleksiPesertaDidik: body.refleksiPesertaDidik,
        pengayaanRemedial: body.pengayaanRemedial,
        bahanBacaan: body.bahanBacaan,
        glosarium: body.glosarium,
        status: body.status || "DRAFT",
        creatorId: body.creatorId,
        teacherId: body.teacherId,
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

    return NextResponse.json(rpp, { status: 201 })
  } catch (error) {
    console.error("Error creating RPP:", error)
    return NextResponse.json({ error: "Failed to create RPP" }, { status: 500 })
  }
}

