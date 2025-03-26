import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/attendance - Get attendance records with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const userId = searchParams.get("userId") || undefined
    const studentId = searchParams.get("studentId") || undefined
    const status = searchParams.get("status") || undefined
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (studentId) {
      where.studentId = studentId
    }

    if (status) {
      where.status = status
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

    // Execute query with count
    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },
          student: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  avatar: true,
                },
              },
              grade: true,
              class: true,
            },
          },
        },
      }),
      prisma.attendance.count({ where }),
    ])

    return NextResponse.json({
      attendances,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching attendance records:", error)
    return NextResponse.json({ error: "Failed to fetch attendance records" }, { status: 500 })
  }
}

// POST /api/attendance - Create a new attendance record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.userId || !body.date || !body.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        userId: body.userId,
        studentId: body.studentId,
        date: new Date(body.date),
        status: body.status,
        location: body.location,
        notes: body.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
        student: body.studentId
          ? {
              select: {
                id: true,
                user: {
                  select: {
                    name: true,
                    avatar: true,
                  },
                },
                grade: true,
                class: true,
              },
            }
          : undefined,
      },
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error("Error creating attendance record:", error)
    return NextResponse.json({ error: "Failed to create attendance record" }, { status: 500 })
  }
}

