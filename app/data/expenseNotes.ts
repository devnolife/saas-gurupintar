export interface ExpenseNote {
  id: string
  date: string
  description: string
  amount: number
  category: string
  status: "pending" | "approved" | "rejected"
  attachments?: string[]
  createdBy: string
  createdAt: string
  updatedAt?: string
}

export const expenseCategories = [
  "Office Supplies",
  "Teaching Materials",
  "Equipment",
  "Utilities",
  "Transportation",
  "Events",
  "Maintenance",
  "Salaries",
  "Other",
]

// Mock data for expense notes
export const mockExpenseNotes: ExpenseNote[] = [
  {
    id: "exp-001",
    date: "2023-07-15",
    description: "Purchase of new textbooks for Grade 10",
    amount: 1500000,
    category: "Teaching Materials",
    status: "approved",
    attachments: ["receipt-001.pdf"],
    createdBy: "operator1",
    createdAt: "2023-07-15T08:30:00Z",
    updatedAt: "2023-07-16T10:15:00Z",
  },
  {
    id: "exp-002",
    date: "2023-07-18",
    description: "Monthly internet bill",
    amount: 750000,
    category: "Utilities",
    status: "approved",
    createdBy: "operator1",
    createdAt: "2023-07-18T14:20:00Z",
  },
  {
    id: "exp-003",
    date: "2023-07-20",
    description: "School event decorations",
    amount: 500000,
    category: "Events",
    status: "pending",
    attachments: ["receipt-003.pdf", "event-plan.docx"],
    createdBy: "operator1",
    createdAt: "2023-07-20T09:45:00Z",
  },
  {
    id: "exp-004",
    date: "2023-07-22",
    description: "Teacher training workshop materials",
    amount: 1200000,
    category: "Teaching Materials",
    status: "pending",
    createdBy: "operator1",
    createdAt: "2023-07-22T11:10:00Z",
  },
  {
    id: "exp-005",
    date: "2023-07-25",
    description: "Classroom furniture repair",
    amount: 850000,
    category: "Maintenance",
    status: "rejected",
    attachments: ["receipt-005.pdf", "repair-quote.pdf"],
    createdBy: "operator1",
    createdAt: "2023-07-25T13:30:00Z",
    updatedAt: "2023-07-26T09:20:00Z",
  },
]

// Function to get expense notes (simulating an API call)
export function getExpenseNotes(userId: string): ExpenseNote[] {
  // In a real app, this would filter based on user permissions
  return mockExpenseNotes
}

// Function to get expense note by ID
export function getExpenseNoteById(id: string): ExpenseNote | undefined {
  return mockExpenseNotes.find((note) => note.id === id)
}

// Function to format currency (Indonesian Rupiah)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

