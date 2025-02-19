import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, authorId } = await request.json()
    const post = await prisma.post.create({
      data: { title, content, authorId },
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 })
  }
}

