import { faker } from "@faker-js/faker"

export interface OperatorPackage {
  id: string
  tier: "basic" | "standard" | "premium" | "enterprise"
  name: string
  price: number
  features: string[]
  purchaseDate: string
  expiryDate: string
}

export interface Operator {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "active" | "pending" | "suspended" | "inactive"
  region: string
  schools: number
  packages: OperatorPackage[]
  lastActive: string
  createdAt: string
  company?: {
    name: string
    position: string
    department: string
  }
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  settings?: {
    twoFactorEnabled: boolean
    notificationsEnabled: boolean
    language: string
    timezone: string
  }
  quotaUsage?: {
    total: number
    used: number
    remaining: number
    lastUpdated: string
  }
  customPermissions?: string[]
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
}

export interface Permission {
  id: string
  name: string
  description: string
  module: string
}

export const mockRoles: Role[] = [
  {
    id: "role-001",
    name: "Administrator",
    description: "Full access to all features",
    permissions: ["view_reports", "manage_users", "manage_settings"],
  },
  {
    id: "role-002",
    name: "Manager",
    description: "Manage users and view reports",
    permissions: ["view_reports", "manage_users"],
  },
  {
    id: "role-003",
    name: "Support",
    description: "View reports and manage users",
    permissions: ["view_reports", "manage_users"],
  },
  {
    id: "role-004",
    name: "Viewer",
    description: "View reports only",
    permissions: ["view_reports"],
  },
]

export const mockPermissions: Permission[] = [
  {
    id: "view_reports",
    name: "View Reports",
    description: "Allows the user to view reports",
    module: "Reports",
  },
  {
    id: "manage_users",
    name: "Manage Users",
    description: "Allows the user to manage user accounts",
    module: "Users",
  },
  {
    id: "manage_settings",
    name: "Manage Settings",
    description: "Allows the user to manage system settings",
    module: "Settings",
  },
]

export function generateMockOperators(count: number): Operator[] {
  const operators: Operator[] = []
  const regions = ["North", "South", "East", "West", "Central"]
  const statuses: ("active" | "pending" | "suspended" | "inactive")[] = ["active", "pending", "suspended", "inactive"]
  const accountTypes = ["Individual", "Organization"]

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`
    const email = faker.internet.email({ firstName: firstName, lastName: lastName }).toLowerCase()

    const operator: Operator = {
      id: `op-${(i + 1).toString().padStart(3, "0")}`,
      name,
      email,
      phone: faker.phone.number(),
      role: faker.helpers.arrayElement(["Regional Manager", "District Coordinator", "School Administrator"]),
      status: faker.helpers.arrayElement(statuses),
      region: faker.helpers.arrayElement(regions),
      schools: faker.number.int({ min: 1, max: 20 }),
      packages: [
        {
          id: faker.string.uuid(),
          tier: faker.helpers.arrayElement(["basic", "standard", "premium", "enterprise"]),
          name: faker.commerce.productName(),
          price: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
          features: faker.helpers.arrayElements(
            mockPermissions.map((p) => p.name),
            3,
          ),
          purchaseDate: faker.date.past().toISOString(),
          expiryDate: faker.date.future().toISOString(),
        },
      ],
      lastActive: faker.date.recent().toISOString(),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      company: {
        name: faker.company.name(),
        position: faker.person.jobTitle(),
        department: faker.commerce.department(),
      },
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      settings: {
        twoFactorEnabled: faker.datatype.boolean(),
        notificationsEnabled: faker.datatype.boolean(),
        language: faker.helpers.arrayElement(["English", "Spanish", "French"]),
        timezone: faker.helpers.arrayElement(["UTC-8", "UTC-5", "UTC+1", "UTC+8"]),
      },
      quotaUsage: {
        total: faker.number.int({ min: 500, max: 2000 }),
        used: faker.number.int({ min: 100, max: 500 }),
        remaining: faker.number.int({ min: 0, max: 1000 }),
        lastUpdated: faker.date.recent().toISOString(),
      },
      customPermissions: faker.helpers.arrayElements(
        mockPermissions.map((p) => p.id),
        faker.number.int({ min: 0, max: 5 }),
      ),
      accountType: faker.helpers.arrayElement(accountTypes),
    }

    operators.push(operator)
  }

  return operators
}

