"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Paperclip, X } from "lucide-react"
import { type ExpenseNote, expenseCategories, formatCurrency } from "@/app/data/expenseNotes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface ExpenseNoteFormProps {
  expense?: ExpenseNote
  isViewMode?: boolean
  onSubmit: () => void
  onCancel: () => void
}

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.enum(["pending", "approved", "rejected"]),
  attachments: z.array(z.string()).optional(),
})

export function ExpenseNoteForm({ expense, isViewMode = false, onSubmit, onCancel }: ExpenseNoteFormProps) {
  const [files, setFiles] = useState<File[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: expense
      ? {
          date: expense.date,
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
          status: expense.status,
          attachments: expense.attachments || [],
        }
      : {
          date: new Date().toISOString().split("T")[0],
          description: "",
          amount: 0,
          category: "",
          status: "pending",
          attachments: [],
        },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would save the form data to your backend
    console.log("Form values:", values)
    console.log("Files:", files)
    onSubmit()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  if (isViewMode && expense) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <p className="text-sm mt-1">{new Date(expense.date).toLocaleDateString()}</p>
          </div>
          <div>
            <Label>Status</Label>
            <div className="mt-1">
              <Badge
                variant={
                  expense.status === "approved" ? "success" : expense.status === "rejected" ? "destructive" : "default"
                }
                as
                any
              >
                {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <p className="text-sm mt-1">{expense.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Amount</Label>
            <p className="text-sm mt-1 font-medium">{formatCurrency(expense.amount)}</p>
          </div>
          <div>
            <Label>Category</Label>
            <p className="text-sm mt-1">{expense.category}</p>
          </div>
        </div>

        {expense.attachments && expense.attachments.length > 0 && (
          <div>
            <Label>Attachments</Label>
            <div className="mt-2 space-y-2">
              {expense.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center p-2 rounded-md bg-muted">
                  <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{attachment}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <Label>Created By</Label>
            <p className="mt-1">Operator ID: {expense.createdBy}</p>
          </div>
          <div>
            <Label>Created At</Label>
            <p className="mt-1">{new Date(expense.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {expense.updatedAt && (
          <div className="text-sm text-muted-foreground">
            <Label>Last Updated</Label>
            <p className="mt-1">{new Date(expense.updatedAt).toLocaleString()}</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={onCancel}>Close</Button>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select disabled={isViewMode} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter expense description"
                  className="resize-none"
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (IDR)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} disabled={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select disabled={isViewMode} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Label htmlFor="file-upload">Attachments</Label>
          <div className="mt-2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Paperclip className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, PNG, JPG or DOCX (MAX. 10MB)</p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isViewMode}
                />
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                  <div className="flex items-center">
                    <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={isViewMode}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {expense?.attachments && expense.attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {expense.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center p-2 rounded-md bg-muted">
                  <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{attachment}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isViewMode}>
            {expense ? "Update Expense" : "Create Expense"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

