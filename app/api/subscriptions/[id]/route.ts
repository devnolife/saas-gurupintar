import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/subscriptions/[id] - Get a specific subscription
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: params.id },
      include: {
        operator: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phone: true,
              },
            },
            school: {
              select: {
                id: true,
                name: true,
                city: true,
                province: true,
              },
            },
          },
        },
      },
    })

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

// PUT /api/subscriptions/[id] - Update a subscription
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id: params.id },
    })

    if (!existingSubscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Update subscription
    const subscription = await prisma.subscription.update({
      where: { id: params.id },
      data: {
        tier: body.tier,
        name: body.name,
        price: body.price ? Number.parseFloat(body.price) : undefined,
        features: body.features,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        status: body.status,
      },
      include: {
        operator: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

// DELETE /api/subscriptions/[id] - Delete a subscription
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id: params.id },
    })

    if (!existingSubscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Delete subscription
    await prisma.subscription.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Subscription deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting subscription:", error)
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 })
  }
}

