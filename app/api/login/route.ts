import { NextResponse } from "next/server"
import teachers from "../../data/users.json"
import students from "../../data/students.json"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  
  const teacher = teachers.find((u) => u.email === email)
  if (teacher && teacher.password === password) {
    return NextResponse.json({
      success: true,
      user: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    })
  }

  
  const student = students.find((u) => u.email === email)
  if (student && student.password === password) {
    return NextResponse.json({
      success: true,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: "student",
        class: student.class,
        school: student.school,
      },
    })
  }
  
  return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
}

