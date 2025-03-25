"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, ChevronsUpDown, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PaymentSettings() {
  const [activeTab, setActiveTab] = useState("payment-gateways")
  const [stripeEnabled, setStripeEnabled] = useState(true)
  const [paypalEnabled, setPaypalEnabled] = useState(true)
  const [manualEnabled, setManualEnabled] = useState(false)

  const [currency, setCurrency] = useState("USD")
  const [taxRate, setTaxRate] = useState("7.5")
  const [invoicePrefix, setInvoicePrefix] = useState("INV-")
  const [invoiceFooter, setInvoiceFooter] = useState("Thank you for your business!")

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment Settings</h2>

      <Tabs defaultValue="payment-gateways" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="payment-gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="currency-tax">Currency & Tax</TabsTrigger>
          <TabsTrigger value="invoice-settings">Invoice Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-gateways">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" /> Stripe
                </CardTitle>
                <CardDescription>Accept credit card payments via Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stripe-enabled">Enable Stripe</Label>
                    <Switch id="stripe-enabled" checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
                  </div>

                  {stripeEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-key">Stripe API Key</Label>
                        <Input id="stripe-key" type="password" value="sk_test_•••••••••••••••••••••••••" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                        <Input
                          id="stripe-webhook"
                          type="password"
                          value="whsec_•••••••••••••••••••••••••••••••"
                          readOnly
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Update Stripe Settings
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" /> PayPal
                </CardTitle>
                <CardDescription>Accept payments via PayPal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paypal-enabled">Enable PayPal</Label>
                    <Switch id="paypal-enabled" checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
                  </div>

                  {paypalEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-client-id">Client ID</Label>
                        <Input id="paypal-client-id" value="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-secret">Client Secret</Label>
                        <Input
                          id="paypal-secret"
                          type="password"
                          value="••••••••••••••••••••••••••••••••••••"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-mode">Mode</Label>
                        <Select defaultValue="sandbox">
                          <SelectTrigger id="paypal-mode">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                            <SelectItem value="live">Live</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm">
                        Update PayPal Settings
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChevronsUpDown className="mr-2 h-5 w-5" /> Manual Payments
                </CardTitle>
                <CardDescription>Accept manual payments (bank transfers, checks, etc.)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manual-enabled">Enable Manual Payments</Label>
                    <Switch id="manual-enabled" checked={manualEnabled} onCheckedChange={setManualEnabled} />
                  </div>

                  {manualEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="manual-instructions">Payment Instructions</Label>
                        <Input
                          id="manual-instructions"
                          value="Please transfer the payment to our bank account within 7 days."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-bank-details">Bank Details</Label>
                        <Input
                          id="manual-bank-details"
                          value="Bank: Example Bank, Account: 1234567890, Routing: 987654321"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Update Manual Payment Settings
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="currency-tax">
          <Card>
            <CardHeader>
              <CardTitle>Currency & Tax Settings</CardTitle>
              <CardDescription>Configure your currency and tax settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="tax-inclusive" />
                  <Label htmlFor="tax-inclusive">Display prices tax-inclusive</Label>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Tax Configuration</AlertTitle>
                  <AlertDescription>
                    Tax rates may vary by region. Consider consulting with a tax professional to ensure compliance with
                    local tax laws.
                  </AlertDescription>
                </Alert>

                <Button>Save Currency & Tax Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoice-settings">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>Configure how your invoices appear to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                  <Input id="invoice-prefix" value={invoicePrefix} onChange={(e) => setInvoicePrefix(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your Company Name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <Input id="company-address" placeholder="123 Main St, City, Country" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
                  <Input id="invoice-footer" value={invoiceFooter} onChange={(e) => setInvoiceFooter(e.target.value)} />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-send-invoices" defaultChecked />
                  <Label htmlFor="auto-send-invoices">Automatically send invoices</Label>
                </div>

                <Button>Save Invoice Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

