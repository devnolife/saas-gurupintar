"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Save } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  maxOperators: number
  maxTeachers: number
  price: number
}

interface TeacherPricing {
  id: string
  minTeachers: number
  maxTeachers: number
  pricePerTeacher: number
  bulkDiscount: number
}

const initialPricingTiers: PricingTier[] = [
  { id: "1", name: "Basic", maxOperators: 1, maxTeachers: 20, price: 1000 },
  { id: "2", name: "Standard", maxOperators: 2, maxTeachers: 50, price: 2000 },
  { id: "3", name: "Premium", maxOperators: 3, maxTeachers: 100, price: 3000 },
]

const initialTeacherPricing: TeacherPricing[] = [
  { id: "1", minTeachers: 1, maxTeachers: 20, pricePerTeacher: 50, bulkDiscount: 0 },
  { id: "2", minTeachers: 21, maxTeachers: 50, pricePerTeacher: 45, bulkDiscount: 5 },
  { id: "3", minTeachers: 51, maxTeachers: 100, pricePerTeacher: 40, bulkDiscount: 10 },
]

export default function PricingManagementPage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(initialPricingTiers)
  const [teacherPricing, setTeacherPricing] = useState<TeacherPricing[]>(initialTeacherPricing)
  const [newTier, setNewTier] = useState<PricingTier>({ id: "", name: "", maxOperators: 0, maxTeachers: 0, price: 0 })
  const [newTeacherPricing, setNewTeacherPricing] = useState<TeacherPricing>({
    id: "",
    minTeachers: 0,
    maxTeachers: 0,
    pricePerTeacher: 0,
    bulkDiscount: 0,
  })

  const handlePricingTierChange = (id: string, field: keyof PricingTier, value: string | number) => {
    setPricingTiers((prev) =>
      prev.map((tier) =>
        tier.id === id ? { ...tier, [field]: typeof value === "string" ? value : Number(value) } : tier,
      ),
    )
  }

  const handleTeacherPricingChange = (id: string, field: keyof TeacherPricing, value: string | number) => {
    setTeacherPricing((prev) =>
      prev.map((pricing) =>
        pricing.id === id ? { ...pricing, [field]: typeof value === "string" ? value : Number(value) } : pricing,
      ),
    )
  }

  const handleAddPricingTier = () => {
    if (newTier.name && newTier.maxOperators && newTier.maxTeachers && newTier.price) {
      setPricingTiers((prev) => [...prev, { ...newTier, id: String(prev.length + 1) }])
      setNewTier({ id: "", name: "", maxOperators: 0, maxTeachers: 0, price: 0 })
    }
  }

  const handleAddTeacherPricing = () => {
    if (newTeacherPricing.minTeachers && newTeacherPricing.maxTeachers && newTeacherPricing.pricePerTeacher) {
      setTeacherPricing((prev) => [...prev, { ...newTeacherPricing, id: String(prev.length + 1) }])
      setNewTeacherPricing({ id: "", minTeachers: 0, maxTeachers: 0, pricePerTeacher: 0, bulkDiscount: 0 })
    }
  }

  const handleSave = () => {
    // Here you would typically send the updated pricing data to your backend
    console.log("Saving pricing tiers:", pricingTiers)
    console.log("Saving teacher pricing:", teacherPricing)
    // Implement API call to save data
  }

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold mb-6">Pricing Management</h1>

      <Card className="mb-8 shadow-sm border-none">
        <CardHeader>
          <CardTitle>School Pricing Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Max Operators</TableHead>
                <TableHead>Max Teachers</TableHead>
                <TableHead>Price ($/year)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingTiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>
                    <Input
                      value={tier.name}
                      onChange={(e) => handlePricingTierChange(tier.id, "name", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={tier.maxOperators}
                      onChange={(e) => handlePricingTierChange(tier.id, "maxOperators", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={tier.maxTeachers}
                      onChange={(e) => handlePricingTierChange(tier.id, "maxTeachers", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handlePricingTierChange(tier.id, "price", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="New tier name"
                    value={newTier.name}
                    onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Max operators"
                    value={newTier.maxOperators || ""}
                    onChange={(e) => setNewTier({ ...newTier, maxOperators: Number(e.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Max teachers"
                    value={newTier.maxTeachers || ""}
                    onChange={(e) => setNewTier({ ...newTier, maxTeachers: Number(e.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={newTier.price || ""}
                    onChange={(e) => setNewTier({ ...newTier, price: Number(e.target.value) })}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleAddPricingTier} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Pricing Tier
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-sm border-none">
        <CardHeader>
          <CardTitle>Teacher Account Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Min Teachers</TableHead>
                <TableHead>Max Teachers</TableHead>
                <TableHead>Price per Teacher ($/year)</TableHead>
                <TableHead>Bulk Discount (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherPricing.map((pricing) => (
                <TableRow key={pricing.id}>
                  <TableCell>
                    <Input
                      type="number"
                      value={pricing.minTeachers}
                      onChange={(e) => handleTeacherPricingChange(pricing.id, "minTeachers", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={pricing.maxTeachers}
                      onChange={(e) => handleTeacherPricingChange(pricing.id, "maxTeachers", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={pricing.pricePerTeacher}
                      onChange={(e) => handleTeacherPricingChange(pricing.id, "pricePerTeacher", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={pricing.bulkDiscount}
                      onChange={(e) => handleTeacherPricingChange(pricing.id, "bulkDiscount", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Min teachers"
                    value={newTeacherPricing.minTeachers || ""}
                    onChange={(e) =>
                      setNewTeacherPricing({ ...newTeacherPricing, minTeachers: Number(e.target.value) })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Max teachers"
                    value={newTeacherPricing.maxTeachers || ""}
                    onChange={(e) =>
                      setNewTeacherPricing({ ...newTeacherPricing, maxTeachers: Number(e.target.value) })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Price per teacher"
                    value={newTeacherPricing.pricePerTeacher || ""}
                    onChange={(e) =>
                      setNewTeacherPricing({ ...newTeacherPricing, pricePerTeacher: Number(e.target.value) })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Bulk discount"
                    value={newTeacherPricing.bulkDiscount || ""}
                    onChange={(e) =>
                      setNewTeacherPricing({ ...newTeacherPricing, bulkDiscount: Number(e.target.value) })
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleAddTeacherPricing} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Teacher Pricing
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        <Save className="mr-2 h-4 w-4" /> Save Pricing Configuration
      </Button>
    </div>
  )
}

