import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const pricingPackages = await prisma.pricingPackage.findMany()
    return NextResponse.json(pricingPackages)
  } catch (error) {
    console.error("Error fetching pricing packages:", error)
    return NextResponse.json({ error: "Error fetching pricing packages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newPackage = await prisma.pricingPackage.create({ data })
    return NextResponse.json(newPackage)
  } catch (error) {
    console.error("Error creating pricing package:", error)
    return NextResponse.json({ error: "Error creating pricing package" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()
    const updatedPackage = await prisma.pricingPackage.update({
      where: { id },
      data,
    })
    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error("Error updating pricing package:", error)
    return NextResponse.json({ error: "Error updating pricing package" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.pricingPackage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting pricing package:", error)
    return NextResponse.json({ error: "Error deleting pricing package" }, { status: 500 })
  }
}

