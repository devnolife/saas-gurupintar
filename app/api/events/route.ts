import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/events - Get all events with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || undefined
    const status = searchParams.get("status") || undefined
    const schoolId = searchParams.get("schoolId") || undefined
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
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

    if (schoolId) {
      where.schoolId = schoolId
    }

    if (startDate || endDate) {
      where.OR = []

      // Events that start within the date range
      const startDateFilter: any = {}
      if (startDate) {
        startDateFilter.gte = new Date(startDate)
      }
      if (endDate) {
        startDateFilter.lte = new Date(endDate)
      }
      if (Object.keys(startDateFilter).length > 0) {
        where.OR.push({ startDate: startDateFilter })
      }

      // Events that end within the date range
      const endDateFilter: any = {}
      if (startDate) {
        endDateFilter.gte = new Date(startDate)
      }
      if (endDate) {
        endDateFilter.lte = new Date(endDate)
      }
      if (Object.keys(endDateFilter).length > 0) {
        where.OR.push({ endDate: endDateFilter })
      }

      // Events that span the date range
      if (startDate && endDate) {
        where.OR.push({
          AND: [{ startDate: { lte: new Date(startDate) } }, { endDate: { gte: new Date(endDate) } }],
        })
      }
    }

    if (search) {
      where.OR = where.OR || []
      where.OR.push(
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      )
    }

    // Execute query with count
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: "asc" },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
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
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      events,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.title || !body.startDate || !body.endDate || !body.type || !body.creatorId || !body.schoolId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        location: body.location,
        organizer: body.organizer,
        type: body.type,
        status: body.status || "UPCOMING",
        participants: body.participants || [],
        imageUrl: body.imageUrl,
        creatorId: body.creatorId,
        schoolId: body.schoolId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
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
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

