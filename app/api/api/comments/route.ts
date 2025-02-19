import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true, post: true },
    })
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching comments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { content, postId, authorId } = await request.json()
    const comment = await prisma.comment.create({
      data: { content, postId, authorId },
    })
    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: "Error creating comment" }, { status: 500 })
  }
}

