import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/api/prisma"

// GET /api/subscriptions - Get all subscriptions with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const tier = searchParams.get("tier") || undefined
    const status = searchParams.get("status") || undefined
    const operatorId = searchParams.get("operatorId") || undefined

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (tier) {
      where.tier = tier
    }

    if (status) {
      where.status = status
    }

    if (operatorId) {
      where.operatorId = operatorId
    }

    // Execute query with count
    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { expiryDate: "desc" },
        include: {
          operator: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
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
          },
        },
      }),
      prisma.subscription.count({ where }),
    ])

    return NextResponse.json({
      subscriptions,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

// POST /api/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.tier || !body.name || !body.price || !body.purchaseDate || !body.expiryDate || !body.operatorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if operator already has a subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { operatorId: body.operatorId },
    })

    if (existingSubscription) {
      return NextResponse.json({ error: "Operator already has a subscription" }, { status: 409 })
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        tier: body.tier,
        name: body.name,
        price: Number.parseFloat(body.price),
        features: body.features || [],
        purchaseDate: new Date(body.purchaseDate),
        expiryDate: new Date(body.expiryDate),
        status: body.status || "ACTIVE",
        operatorId: body.operatorId,
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

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}

