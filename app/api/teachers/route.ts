import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/teachers - Get all teachers with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const subject = searchParams.get("subject") || undefined
    const school = searchParams.get("school") || undefined
    const search = searchParams.get("search") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {
      user: {
        role: "TEACHER",
      },
    }

    if (subject) {
      where.subject = subject
    }

    if (school) {
      where.school = {
        name: { contains: school, mode: "insensitive" },
      }
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { subject: { contains: search, mode: "insensitive" } },
      ]
    }

    // Execute query with count
    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take: limit,
        orderBy: { user: { name: "asc" } },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
              avatar: true,
              lastActive: true,
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
      prisma.teacher.count({ where }),
    ])

    return NextResponse.json({
      teachers,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 })
  }
}

// POST /api/teachers - Create a new teacher
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create user and teacher in a transaction
    const teacher = await prisma.$transaction(async (tx) => {
      // Map status string to UserStatus enum
      let userStatus = "ACTIVE";
      if (body.status === "pending") userStatus = "PENDING";
      if (body.status === "inactive") userStatus = "INACTIVE";

      // Create user
      const user = await tx.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password, // In production, hash this password
          role: "TEACHER",
          phone: body.phone,
          address: body.address,
          bio: body.bio,
          avatar: body.avatar,
          status: userStatus,
        },
      })

      // Create teacher profile
      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
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

    return NextResponse.json(teacher, { status: 201 })
  } catch (error) {
    console.error("Error creating teacher:", error)
    return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 })
  }
}

