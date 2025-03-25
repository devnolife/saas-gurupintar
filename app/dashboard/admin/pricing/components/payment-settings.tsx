"use client"

import { useState } from "react"
import { CreditCard, Globe, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for payment gateways
const initialPaymentGateways = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept credit card payments via Stripe",
    isConfigured: true,
    isActive: true,
    supportedCountries: ["global"],
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    processingFee: "2.9% + $0.30",
    apiKey: "sk_test_***************************",
    publicKey: "pk_test_***************************",
    webhookSecret: "whsec_***************************",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Accept payments via PayPal",
    isConfigured: true,
    isActive: true,
    supportedCountries: ["global"],
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    processingFee: "3.49% + $0.49",
    clientId: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    clientSecret: "********************************",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Accept payments via bank transfer",
    isConfigured: true,
    isActive: true,
    supportedCountries: ["global"],
    supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    processingFee: "0%",
    accountDetails: "Bank: Example Bank\nAccount Number: 1234567890\nRouting Number: 123456789",
  },
]

// Mock data for tax settings
const initialTaxSettings = [
  {
    id: "us-tax",
    country: "United States",
    state: "All",
    taxRate: 0,
    taxName: "Sales Tax",
    isActive: true,
  },
  {
    id: "ca-tax",
    country: "Canada",
    state: "All",
    taxRate: 5,
    taxName: "GST",
    isActive: true,
  },
  {
    id: "uk-tax",
    country: "United Kingdom",
    state: "All",
    taxRate: 20,
    taxName: "VAT",
    isActive: true,
  },
  {
    id: "au-tax",
    country: "Australia",
    state: "All",
    taxRate: 10,
    taxName: "GST",
    isActive: true,
  },
  {
    id: "eu-tax",
    country: "European Union",
    state: "All",
    taxRate: 23,
    taxName: "VAT",
    isActive: true,
  },
]

export function PaymentSettings() {
  const [activeTab, setActiveTab] = useState("gateways")
  const [paymentGateways, setPaymentGateways] = useState(initialPaymentGateways)
  const [taxSettings, setTaxSettings] = useState(initialTaxSettings)
  const [editingGateway, setEditingGateway] = useState(null)
  const [editingTax, setEditingTax] = useState(null)
  const [isGatewayDialogOpen, setIsGatewayDialogOpen] = useState(false)
  const [isTaxDialogOpen, setIsTaxDialogOpen] = useState(false)

  const handleSaveGateway = () => {
    if (editingGateway) {
      const updatedGateways = [...paymentGateways]
      const gatewayIndex = updatedGateways.findIndex((g) => g.id === editingGateway.id)

      if (gatewayIndex >= 0) {
        updatedGateways[gatewayIndex] = editingGateway
      } else {
        updatedGateways.push(editingGateway)
      }

      setPaymentGateways(updatedGateways)
      setIsGatewayDialogOpen(false)
      setEditingGateway(null)
    }
  }

  const handleEditGateway = (gateway) => {
    setEditingGateway({ ...gateway })
    setIsGatewayDialogOpen(true)
  }

  const handleAddNewGateway = () => {
    const newId = `gateway-new-${Date.now()}`
    setEditingGateway({
      id: newId,
      name: "New Payment Gateway",
      description: "Description for the new payment gateway",
      isConfigured: false,
      isActive: false,
      supportedCountries: ["global"],
      supportedCurrencies: ["USD"],
      processingFee: "0%",
    })
    setIsGatewayDialogOpen(true)
  }

  const handleDeleteGateway = (gatewayId) => {
    if (confirm("Are you sure you want to delete this payment gateway? This action cannot be undone.")) {
      setPaymentGateways(paymentGateways.filter((g) => g.id !== gatewayId))
    }
  }

  const handleSaveTax = () => {
    if (editingTax) {
      const updatedTaxes = [...taxSettings]
      const taxIndex = updatedTaxes.findIndex((t) => t.id === editingTax.id)

      if (taxIndex >= 0) {
        updatedTaxes[taxIndex] = editingTax
      } else {
        updatedTaxes.push(editingTax)
      }

      setTaxSettings(updatedTaxes)
      setIsTaxDialogOpen(false)
      setEditingTax(null)
    }
  }

  const handleEditTax = (tax) => {
    setEditingTax({ ...tax })
    setIsTaxDialogOpen(true)
  }

  const handleAddNewTax = () => {
    const newId = `tax-new-${Date.now()}`
    setEditingTax({
      id: newId,
      country: "",
      state: "All",
      taxRate: 0,
      taxName: "Tax",
      isActive: true,
    })
    setIsTaxDialogOpen(true)
  }

  const handleDeleteTax = (taxId) => {
    if (confirm("Are you sure you want to delete this tax setting? This action cannot be undone.")) {
      setTaxSettings(taxSettings.filter((t) => t.id !== taxId))
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Payment Settings</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="gateways" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Gateways</span>
          </TabsTrigger>
          <TabsTrigger value="taxes" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Tax Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gateways" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Payment Gateways</h3>
            <Button onClick={handleAddNewGateway}>
              <Plus className="mr-2 h-4 w-4" /> Add New Gateway
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentGateways.map((gateway) => (
              <Card key={gateway.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{gateway.name}</CardTitle>
                      <CardDescription className="mt-2">{gateway.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGateway(gateway.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className={`font-medium ${gateway.isConfigured ? "text-green-600" : "text-amber-600"}`}>
                        {gateway.isConfigured ? "Configured" : "Not Configured"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Processing Fee:</span>
                      <span className="font-medium">{gateway.processingFee}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Supported Currencies:</span>
                      <span className="font-medium">{gateway.supportedCurrencies.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-${gateway.id}`}
                      checked={gateway.isActive}
                      onCheckedChange={(checked) => {
                        const updatedGateways = [...paymentGateways]
                        const gatewayIndex = updatedGateways.findIndex((g) => g.id === gateway.id)
                        updatedGateways[gatewayIndex].isActive = checked
                        setPaymentGateways(updatedGateways)
                      }}
                      disabled={!gateway.isConfigured}
                    />
                    <Label htmlFor={`active-${gateway.id}`}>Active</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEditGateway(gateway)}>
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tax Settings</h3>
            <Button onClick={handleAddNewTax}>
              <Plus className="mr-2 h-4 w-4" /> Add New Tax
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country/Region</TableHead>
                    <TableHead>State/Province</TableHead>
                    <TableHead>Tax Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxSettings.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell>{tax.country}</TableCell>
                      <TableCell>{tax.state}</TableCell>
                      <TableCell>{tax.taxName}</TableCell>
                      <TableCell>{tax.taxRate}%</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`tax-active-${tax.id}`}
                            checked={tax.isActive}
                            onCheckedChange={(checked) => {
                              const updatedTaxes = [...taxSettings]
                              const taxIndex = updatedTaxes.findIndex((t) => t.id === tax.id)
                              updatedTaxes[taxIndex].isActive = checked
                              setTaxSettings(updatedTaxes)
                            }}
                          />
                          <Label htmlFor={`tax-active-${tax.id}`} className="sr-only">
                            Active
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditTax(tax)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteTax(tax.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isGatewayDialogOpen} onOpenChange={setIsGatewayDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingGateway?.id.includes("new") ? "Add New Payment Gateway" : `Configure ${editingGateway?.name}`}
            </DialogTitle>
            <DialogDescription>
              Configure the payment gateway settings. These credentials will be used to process payments.
            </DialogDescription>
          </DialogHeader>

          {editingGateway && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gateway-name">Gateway Name</Label>
                  <Input
                    id="gateway-name"
                    value={editingGateway.name}
                    onChange={(e) => setEditingGateway({ ...editingGateway, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processing-fee">Processing Fee</Label>
                  <Input
                    id="processing-fee"
                    value={editingGateway.processingFee}
                    onChange={(e) => setEditingGateway({ ...editingGateway, processingFee: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gateway-description">Description</Label>
                <Textarea
                  id="gateway-description"
                  value={editingGateway.description}
                  onChange={(e) => setEditingGateway({ ...editingGateway, description: e.target.value })}
                />
              </div>

              {editingGateway.id === "stripe" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-api-key">API Key</Label>
                    <Input
                      id="stripe-api-key"
                      type="password"
                      value={editingGateway.apiKey}
                      onChange={(e) => setEditingGateway({ ...editingGateway, apiKey: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stripe-public-key">Public Key</Label>
                    <Input
                      id="stripe-public-key"
                      value={editingGateway.publicKey}
                      onChange={(e) => setEditingGateway({ ...editingGateway, publicKey: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                    <Input
                      id="stripe-webhook-secret"
                      type="password"
                      value={editingGateway.webhookSecret}
                      onChange={(e) => setEditingGateway({ ...editingGateway, webhookSecret: e.target.value })}
                    />
                  </div>
                </>
              )}

              {editingGateway.id === "paypal" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-id">Client ID</Label>
                    <Input
                      id="paypal-client-id"
                      value={editingGateway.clientId}
                      onChange={(e) => setEditingGateway({ ...editingGateway, clientId: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-secret">Client Secret</Label>
                    <Input
                      id="paypal-client-secret"
                      type="password"
                      value={editingGateway.clientSecret}
                      onChange={(e) => setEditingGateway({ ...editingGateway, clientSecret: e.target.value })}
                    />
                  </div>
                </>
              )}

              {editingGateway.id === "bank-transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="bank-account-details">Account Details</Label>
                  <Textarea
                    id="bank-account-details"
                    value={editingGateway.accountDetails}
                    onChange={(e) => setEditingGateway({ ...editingGateway, accountDetails: e.target.value })}
                    rows={5}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Supported Currencies</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["USD", "EUR", "GBP", "CAD", "AUD"].map((currency) => (
                    <div key={currency} className="flex items-center space-x-2">
                      <Switch
                        id={`currency-${currency}`}
                        checked={editingGateway.supportedCurrencies.includes(currency)}
                        onCheckedChange={(checked) => {
                          const updatedCurrencies = [...editingGateway.supportedCurrencies]
                          const currencyIndex = updatedCurrencies.indexOf(currency)

                          if (checked && currencyIndex === -1) {
                            updatedCurrencies.push(currency)
                          } else if (!checked && currencyIndex !== -1) {
                            updatedCurrencies.splice(currencyIndex, 1)
                          }

                          setEditingGateway({ ...editingGateway, supportedCurrencies: updatedCurrencies })
                        }}
                      />
                      <Label htmlFor={`currency-${currency}`}>{currency}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="gateway-active"
                  checked={editingGateway.isActive}
                  onCheckedChange={(checked) => setEditingGateway({ ...editingGateway, isActive: checked })}
                />
                <Label htmlFor="gateway-active">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGatewayDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Mark as configured if it's a new gateway or being edited
                if (editingGateway) {
                  setEditingGateway({ ...editingGateway, isConfigured: true })
                }
                handleSaveGateway()
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTaxDialogOpen} onOpenChange={setIsTaxDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTax?.id.includes("new") ? "Add New Tax Setting" : "Edit Tax Setting"}</DialogTitle>
            <DialogDescription>
              Configure tax settings for different regions. These settings will be applied to purchases from the
              specified regions.
            </DialogDescription>
          </DialogHeader>

          {editingTax && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tax-country">Country/Region</Label>
                <Input
                  id="tax-country"
                  value={editingTax.country}
                  onChange={(e) => setEditingTax({ ...editingTax, country: e.target.value })}
                  placeholder="e.g., United States, European Union"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-state">State/Province</Label>
                <Input
                  id="tax-state"
                  value={editingTax.state}
                  onChange={(e) => setEditingTax({ ...editingTax, state: e.target.value })}
                  placeholder="e.g., California, All"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-name">Tax Name</Label>
                <Input
                  id="tax-name"
                  value={editingTax.taxName}
                  onChange={(e) => setEditingTax({ ...editingTax, taxName: e.target.value })}
                  placeholder="e.g., Sales Tax, VAT, GST"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={editingTax.taxRate}
                  onChange={(e) => setEditingTax({ ...editingTax, taxRate: Number.parseFloat(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="tax-active"
                  checked={editingTax.isActive}
                  onCheckedChange={(checked) => setEditingTax({ ...editingTax, isActive: checked })}
                />
                <Label htmlFor="tax-active">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaxDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTax}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

