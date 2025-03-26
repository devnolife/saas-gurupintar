import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/schools - Get all schools with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || undefined
    const status = searchParams.get("status") || undefined
    const city = searchParams.get("city") || undefined
    const province = searchParams.get("province") || undefined
    const search = searchParams.get("search") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    if (city) {
      where.city = city
    }

    if (province) {
      where.province = province
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
      ]
    }

    // Execute query with count
    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              teachers: true,
              students: true,
            },
          },
        },
      }),
      prisma.school.count({ where }),
    ])

    return NextResponse.json({
      schools,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
  }
}

// POST /api/schools - Create a new school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name) {
      return NextResponse.json({ error: "School name is required" }, { status: 400 })
    }

    // Create school
    const school = await prisma.school.create({
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
        type: body.type || "PUBLIC",
        accreditation: body.accreditation,
        status: body.status || "ACTIVE",
      },
    })

    return NextResponse.json(school, { status: 201 })
  } catch (error) {
    console.error("Error creating school:", error)
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 })
  }
}

