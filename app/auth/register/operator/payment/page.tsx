"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/register/operator/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethod, cardDetails }),
      })

      if (response.ok) {
        alert("Payment successful! Your account has been created.")
        router.push("/dashboard/operator")
      } else {
        console.error("Failed to process payment")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Pilih Metode Pembayaran</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Kartu Kredit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dana" id="dana" />
                  <Label htmlFor="dana">Dana</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gopay" id="gopay" />
                  <Label htmlFor="gopay">GoPay</Label>
                </div>
              </RadioGroup>
            </div>
            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Nomor Kartu</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Tanggal Kedaluwarsa</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" name="cvv" value={cardDetails.cvv} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            )}
            <Button type="submit" className="w-full">
              Selesaikan Pembayaran
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
