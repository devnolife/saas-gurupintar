"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Plus, Filter, ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface School {
  id: number
  name: string
  address: string
  principalName: string
  studentCount: number
  type: "Public" | "Private"
  accreditation: "A" | "B" | "C"
  city: string
  province: string
  teacherCount: number
  operatorCount: number
  status: "Active" | "Inactive" | "Pending"
}

const mockSchools: School[] = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    address: "Jl. Budi Utomo No.7, Jakarta Pusat",
    principalName: "Dr. Siti Aminah",
    studentCount: 1200,
    teacherCount: 78,
    operatorCount: 3,
    type: "Public",
    accreditation: "A",
    city: "Jakarta",
    province: "DKI Jakarta",
    status: "Active",
  },
  {
    id: 2,
    name: "SMA Negeri 2 Surabaya",
    address: "Jl. Wijaya Kusuma No.48, Surabaya",
    principalName: "Drs. Budi Santoso",
    studentCount: 1000,
    teacherCount: 65,
    operatorCount: 2,
    type: "Public",
    accreditation: "A",
    city: "Surabaya",
    province: "Jawa Timur",
    status: "Active",
  },
  {
    id: 3,
    name: "SMA Swasta Cendekia Bandung",
    address: "Jl. Belitung No.8, Bandung",
    principalName: "Prof. Ahmad Hidayat",
    studentCount: 950,
    teacherCount: 60,
    operatorCount: 2,
    type: "Private",
    accreditation: "B",
    city: "Bandung",
    province: "Jawa Barat",
    status: "Active",
  },
  {
    id: 4,
    name: "SMA Negeri 3 Yogyakarta",
    address: "Jl. Laksda Yos Sudarso No.7, Yogyakarta",
    principalName: "Dr. Hadi Wijaya",
    studentCount: 850,
    teacherCount: 55,
    operatorCount: 2,
    type: "Public",
    accreditation: "A",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    status: "Active",
  },
  {
    id: 5,
    name: "SMA Islam Al-Azhar Makassar",
    address: "Jl. Perintis Kemerdekaan No.15, Makassar",
    principalName: "H. Faisal Rahman",
    studentCount: 780,
    teacherCount: 48,
    operatorCount: 2,
    type: "Private",
    accreditation: "A",
    city: "Makassar",
    province: "Sulawesi Selatan",
    status: "Active",
  },
  {
    id: 6,
    name: "SMA Kristen Penabur Semarang",
    address: "Jl. Gajahmada No.25, Semarang",
    principalName: "Maria Kristiani",
    studentCount: 720,
    teacherCount: 45,
    operatorCount: 2,
    type: "Private",
    accreditation: "A",
    city: "Semarang",
    province: "Jawa Tengah",
    status: "Pending",
  },
  {
    id: 7,
    name: "SMA Negeri 1 Denpasar",
    address: "Jl. Kamboja No.4, Denpasar",
    principalName: "I Made Wirawan",
    studentCount: 900,
    teacherCount: 60,
    operatorCount: 3,
    type: "Public",
    accreditation: "A",
    city: "Denpasar",
    province: "Bali",
    status: "Active",
  },
  {
    id: 8,
    name: "SMA Muhammadiyah 1 Palembang",
    address: "Jl. Jendral Sudirman No.35, Palembang",
    principalName: "H. Abdul Karim",
    studentCount: 650,
    teacherCount: 40,
    operatorCount: 1,
    type: "Private",
    accreditation: "B",
    city: "Palembang",
    province: "Sumatera Selatan",
    status: "Inactive",
  },
]

type SortField = "name" | "studentCount" | "teacherCount" | "operatorCount"
type SortOrder = "asc" | "desc"
type FilterType = "All" | "Public" | "Private"
type FilterStatus = "All" | "Active" | "Inactive" | "Pending"
type FilterAccreditation = "All" | "A" | "B" | "C"

export default function SchoolsPage() {
  const [schools] = useState<School[]>(mockSchools)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [filterType, setFilterType] = useState<FilterType>("All")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All")
  const [filterAccreditation, setFilterAccreditation] = useState<FilterAccreditation>("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter and sort schools
  const filteredAndSortedSchools = schools
    .filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.principalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.province.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "All" || school.type === filterType
      const matchesStatus = filterStatus === "All" || school.status === filterStatus
      const matchesAccreditation = filterAccreditation === "All" || school.accreditation === filterAccreditation

      return matchesSearch && matchesType && matchesStatus && matchesAccreditation
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const resetFilters = () => {
    setFilterType("All")
    setFilterStatus("All")
    setFilterAccreditation("All")
    setSearchTerm("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getAccreditationColor = (accreditation: string) => {
    switch (accreditation) {
      case "A":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "B":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "C":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Public":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      case "Private":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Sekolah</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola data sekolah yang terdaftar di platform Guru Pintar</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Sekolah
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari sekolah berdasarkan nama, alamat, atau kepala sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleSort("name")}>
                  Nama Sekolah {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("studentCount")}>
                  Jumlah Siswa {sortField === "studentCount" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("teacherCount")}>
                  Jumlah Guru {sortField === "teacherCount" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("operatorCount")}>
                  Jumlah Operator {sortField === "operatorCount" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isFilterOpen && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filter Sekolah</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsFilterOpen(false)}>
                X
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipe Sekolah</label>
                <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Semua Tipe</SelectItem>
                    <SelectItem value="Public">Negeri</SelectItem>
                    <SelectItem value="Private">Swasta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Semua Status</SelectItem>
                    <SelectItem value="Active">Aktif</SelectItem>
                    <SelectItem value="Inactive">Tidak Aktif</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Akreditasi</label>
                <Select
                  value={filterAccreditation}
                  onValueChange={(value) => setFilterAccreditation(value as FilterAccreditation)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Akreditasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Semua Akreditasi</SelectItem>
                    <SelectItem value="A">Akreditasi A</SelectItem>
                    <SelectItem value="B">Akreditasi B</SelectItem>
                    <SelectItem value="C">Akreditasi C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSchools.map((school) => (
            <Card key={school.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{school.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 inline" />
                      {school.city}, {school.province}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getTypeColor(school.type)}>
                      {school.type === "Public" ? "Negeri" : "Swasta"}
                    </Badge>
                    <Badge className={getAccreditationColor(school.accreditation)}>
                      Akreditasi {school.accreditation}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Siswa</p>
                    <p className="font-bold">{school.studentCount}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Guru</p>
                    <p className="font-bold">{school.teacherCount}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Operator</p>
                    <p className="font-bold">{school.operatorCount}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Kepala Sekolah: {school.principalName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{school.address}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                {/* Make sure this Link is correctly pointing to the details page */}
                <Link href={`/dashboard/admin/schools/${school.id}`} passHref>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                    Lihat Detail
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

