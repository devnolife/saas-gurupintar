import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/achievements - Get all achievements with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const level = searchParams.get("level") || undefined
    const category = searchParams.get("category") || undefined
    const schoolId = searchParams.get("schoolId") || undefined
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const search = searchParams.get("search") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (level) {
      where.level = level
    }

    if (category) {
      where.category = category
    }

    if (schoolId) {
      where.schoolId = schoolId
    }

    if (startDate || endDate) {
      where.date = {}

      if (startDate) {
        where.date.gte = new Date(startDate)
      }

      if (endDate) {
        where.date.lte = new Date(endDate)
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { organizer: { contains: search, mode: "insensitive" } },
        { coach: { contains: search, mode: "insensitive" } },
      ]
    }

    // Execute query with count
    const [achievements, total] = await Promise.all([
      prisma.achievement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: {
          school: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.achievement.count({ where }),
    ])

    return NextResponse.json({
      achievements,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}

// POST /api/achievements - Create a new achievement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.title || !body.level || !body.date || !body.category || !body.schoolId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create achievement
    const achievement = await prisma.achievement.create({
      data: {
        title: body.title,
        level: body.level,
        date: new Date(body.date),
        organizer: body.organizer,
        category: body.category,
        participants: body.participants || [],
        coach: body.coach,
        image: body.image,
        schoolId: body.schoolId,
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(achievement, { status: 201 })
  } catch (error) {
    console.error("Error creating achievement:", error)
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 })
  }
}

