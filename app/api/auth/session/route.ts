import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/api/prisma"

// GET /api/auth/session - Get current user session
export async function GET(request: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = cookies().get("session")

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Parse session data
    const session = JSON.parse(sessionCookie.value)

    // Fetch latest user data
    const user = await prisma.user.findUnique({
      where: { id: session.id },
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

    if (!user) {
      cookies().delete("session")
      return NextResponse.json({ user: null }, { status: 401 })
    }

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
    console.error("Error fetching session:", error)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}

