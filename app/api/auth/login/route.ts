import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"
import { cookies } from "next/headers"

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: {
        admin: true,
        operator: {
          include: {
            school: true,
          },
        },
        teacher: {
          include: {
            school: true,
          },
        },
        headmaster: {
          include: {
            school: true,
          },
        },
        student: {
          include: {
            school: true,
          },
        },
      },
    })

    // Check if user exists and password matches
    if (!user || user.password !== body.password) {
      // In production, use proper password hashing
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Your account is not active. Please contact an administrator." },
        { status: 403 },
      )
    }

    // Update last active timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() },
    })

    // Create session (simplified for example)
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }

    // Set session cookie
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return user data based on role
    const userData: any = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }

    switch (user.role) {
      case "ADMIN":
        userData.adminId = user.admin?.id
        break
      case "OPERATOR":
        userData.operatorId = user.operator?.id
        userData.school = user.operator?.school
        break
      case "TEACHER":
        userData.teacherId = user.teacher?.id
        userData.school = user.teacher?.school
        userData.subject = user.teacher?.subject
        break
      case "HEADMASTER":
        userData.headmasterId = user.headmaster?.id
        userData.school = user.headmaster?.school
        break
      case "STUDENT":
        userData.studentId = user.student?.id
        userData.school = user.student?.school
        userData.grade = user.student?.grade
        userData.class = user.student?.class
        break
    }

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

