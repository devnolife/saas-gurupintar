"use client"

import { useState } from "react"
import Link from "next/link"
import type { Operator } from "@/lib/api/mockData/operators"
import { useOperatorsStore } from "@/lib/store/useOperatorsStore"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "./status-badge"
import { PackageBadge } from "./package-badge"
import { OperatorDetails } from "./operator-details"
import { MoreHorizontal, Edit, Trash, Eye, Shield, Key, ArrowUpDown } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface OperatorsTableProps {
  operators?: Operator[]
}

export function OperatorsTable({ operators = [] }: OperatorsTableProps) {
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { deleteOperator } = useOperatorsStore()

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this operator?")) {
      await deleteOperator(id)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return "Unknown"
    }
  }

  const viewDetails = (operator: Operator) => {
    setSelectedOperator(operator)
    setDetailsOpen(true)
  }

  // Ensure operators is always an array
  const safeOperators = Array.isArray(operators) ? operators : []

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Schools</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {safeOperators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No operators found.
                </TableCell>
              </TableRow>
            ) : (
              safeOperators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <Link href={`/dashboard/admin/operators/${operator.id}`} className="font-medium hover:underline">
                        {operator.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">{operator.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={operator.status} />
                  </TableCell>
                  <TableCell>{operator.role}</TableCell>
                  <TableCell>{operator.region}</TableCell>
                  <TableCell>{operator.schools}</TableCell>
                  <TableCell>
                    {operator.packages && operator.packages.length > 0 ? (
                      <PackageBadge tier={operator.packages[0].tier} />
                    ) : (
                      <span className="text-muted-foreground text-sm">No package</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(operator.lastActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewDetails(operator)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/admin/operators/${operator.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Full Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(operator.id)} className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OperatorDetails operator={selectedOperator} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </>
  )
}

