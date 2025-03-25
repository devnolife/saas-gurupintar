"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Calendar,
  Clock,
  GraduationCap,
  Book,
  Edit,
  Copy,
  Trash2,
  Download,
  Share2,
  ChevronDown,
  CheckCircle2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SavedRPP {
  id: string
  title: string
  subject: string
  grade: string
  duration: string
  kompetensiAwal: string
  createdAt: string
}

interface SavedRPPListProps {
  savedRPPList: SavedRPP[]
}

export function SavedRPPList({ savedRPPList }: SavedRPPListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredRPPs = savedRPPList.filter(
    (rpp) =>
      rpp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rpp.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rpp.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Saved Lesson Plans</h2>
          <p className="text-muted-foreground">Manage your saved lesson plans</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lesson plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-[300px] rounded-lg"
          />
        </div>
      </div>

      {filteredRPPs.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No lesson plans found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm
                ? `No lesson plans matching "${searchTerm}". Try a different search term.`
                : "You haven't created any lesson plans yet. Create your first one!"}
            </p>
            <Button className="mt-4 gap-2 bg-primary hover:bg-primary-dark">
              <FileText className="h-4 w-4" />
              Create New Lesson Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRPPs.map((rpp) => (
            <motion.div
              key={rpp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200 dark:border-gray-800">
                <CardContent className="p-0">
                  <div
                    className="p-4 cursor-pointer flex flex-col sm:flex-row items-start gap-4"
                    onClick={() => toggleExpand(rpp.id)}
                  >
                    <div className="bg-primary/10 p-3 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg">{rpp.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          >
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Kelas {rpp.grade}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            <Book className="h-3 w-3 mr-1" />
                            {rpp.subject}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(rpp.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {rpp.duration}
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{rpp.kompetensiAwal}</p>
                    </div>

                    <div className="flex items-center mt-4 sm:mt-0">
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                          expandedId === rpp.id ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {expandedId === rpp.id && (
                    <div className="p-4 pt-0 border-t mt-4">
                      <div className="flex flex-wrap gap-2 justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-4 w-4" />
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                        <Button size="sm" className="gap-2 bg-primary hover:bg-primary-dark">
                          <CheckCircle2 className="h-4 w-4" />
                          Use This Plan
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

