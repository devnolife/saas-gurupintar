"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  MapPin,
  User,
  School,
  Search,
  Pencil,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data interfaces
interface SchoolType {
  id: number
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  email: string
  website: string
  principalName: string
  studentCount: number
  teacherCount: number
  foundedYear: number
  status: "Active" | "Inactive" | "Pending"
  type: "Public" | "Private"
  accreditation: "A" | "B" | "C"
}

interface Operator {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: "Active" | "Inactive" | "Pending"
  avatar: string
  lastActive: string
}

interface Teacher {
  id: number
  name: string
  email: string
  subject: string
  status: "Active" | "Inactive" | "Pending"
  avatar: string
  joinDate: string
  documentCount: number
}

interface Package {
  id: number
  name: string
  type: string
  startDate: string
  endDate: string
  status: "Active" | "Expired" | "Pending"
  usagePercentage: number
  maxUsers: number
  currentUsers: number
}

// Mock data
const mockSchools: SchoolType[] = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    address: "Jl. Budi Utomo No.7",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10710",
    phone: "(021) 3865001",
    email: "sman1jakarta@edu.id",
    website: "www.sman1jakarta.sch.id",
    principalName: "Dr. Siti Aminah",
    studentCount: 1200,
    teacherCount: 78,
    foundedYear: 1950,
    status: "Active",
    type: "Public",
    accreditation: "A",
  },
  {
    id: 2,
    name: "SMA Negeri 2 Surabaya",
    address: "Jl. Wijaya Kusuma No.48",
    city: "Surabaya",
    province: "Jawa Timur",
    postalCode: "60272",
    phone: "(031) 5345582",
    email: "sman2surabaya@edu.id",
    website: "www.sman2surabaya.sch.id",
    principalName: "Drs. Budi Santoso",
    studentCount: 1000,
    teacherCount: 65,
    foundedYear: 1952,
    status: "Active",
    type: "Public",
    accreditation: "A",
  },
  {
    id: 3,
    name: "SMA Swasta Cendekia Bandung",
    address: "Jl. Belitung No.8",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40113",
    phone: "(022) 4230393",
    email: "sma.cendekia@edu.id",
    website: "www.smacendekia.sch.id",
    principalName: "Prof. Ahmad Hidayat",
    studentCount: 950,
    teacherCount: 60,
    foundedYear: 1985,
    status: "Active",
    type: "Private",
    accreditation: "B",
  },
]

const mockOperators: Operator[] = [
  {
    id: 1,
    name: "Dewi Lestari",
    email: "dewi.lestari@sman1jakarta.edu.id",
    phone: "081234567890",
    role: "Admin Sekolah",
    status: "Active",
    avatar: "",
    lastActive: "2023-11-15T08:30:00",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    email: "agus.setiawan@sman1jakarta.edu.id",
    phone: "081234567891",
    role: "Operator Data",
    status: "Active",
    avatar: "",
    lastActive: "2023-11-14T14:45:00",
  },
  {
    id: 3,
    name: "Rina Wulandari",
    email: "rina.wulandari@sman1jakarta.edu.id",
    phone: "081234567892",
    role: "Operator Keuangan",
    status: "Inactive",
    avatar: "",
    lastActive: "2023-10-30T09:15:00",
  },
]

const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: "Bambang Suprapto",
    email: "bambang.suprapto@sman1jakarta.edu.id",
    subject: "Matematika",
    status: "Active",
    avatar: "",
    joinDate: "2020-07-15",
    documentCount: 45,
  },
  {
    id: 2,
    name: "Sri Wahyuni",
    email: "sri.wahyuni@sman1jakarta.edu.id",
    subject: "Bahasa Indonesia",
    status: "Active",
    avatar: "",
    joinDate: "2019-08-01",
    documentCount: 32,
  },
  {
    id: 3,
    name: "Hendra Gunawan",
    email: "hendra.gunawan@sman1jakarta.edu.id",
    subject: "Fisika",
    status: "Active",
    avatar: "",
    joinDate: "2021-01-10",
    documentCount: 28,
  },
]

const mockPackages: Package[] = [
  {
    id: 1,
    name: "Paket Guru Pintar Premium",
    type: "Tahunan",
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    status: "Active",
    usagePercentage: 65,
    maxUsers: 100,
    currentUsers: 65,
  },
  {
    id: 2,
    name: "Paket RPP Generator",
    type: "Semester",
    startDate: "2023-08-01",
    endDate: "2023-12-31",
    status: "Active",
    usagePercentage: 78,
    maxUsers: 50,
    currentUsers: 39,
  },
]

export default function SchoolDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const schoolId = Number(params.id)

  const [school, setSchool] = useState<SchoolType | null>(null)
  const [operators, setOperators] = useState<Operator[]>(mockOperators)
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [packages, setPackages] = useState<Package[]>(mockPackages)
  const [activeTeachers, setActiveTeachers] = useState<number>(0)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editedSchool, setEditedSchool] = useState<SchoolType | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Search states
  const [teacherSearchTerm, setTeacherSearchTerm] = useState("")
  const [operatorSearchTerm, setOperatorSearchTerm] = useState("")

  useEffect(() => {
    // Fetch school data
    const foundSchool = mockSchools.find((s) => s.id === schoolId)
    if (!foundSchool) {
      router.push("/dashboard/admin/schools")
      return
    }
    setSchool(foundSchool)

    // Calculate active teachers
    setActiveTeachers(mockTeachers.filter((t) => t.status === "Active").length)
  }, [schoolId, router])

  if (!school) {
    return null // Loading state will be shown by loading.tsx
  }

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(teacherSearchTerm.toLowerCase()),
  )

  // Filter operators based on search term
  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(operatorSearchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(operatorSearchTerm.toLowerCase()) ||
      operator.role.toLowerCase().includes(operatorSearchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const getTimeAgo = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays} hari yang lalu`
    } else if (diffHours > 0) {
      return `${diffHours} jam yang lalu`
    } else {
      return `${diffMinutes} menit yang lalu`
    }
  }

  const handleEditClick = () => {
    setEditedSchool({ ...school })
    setFormErrors({})
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedSchool((prev) => (prev ? { ...prev, [name]: value } : null))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedSchool((prev) => (prev ? { ...prev, [name]: value } : null))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!editedSchool) return false

    if (!editedSchool.name.trim()) {
      errors.name = "Nama sekolah wajib diisi"
    }

    if (!editedSchool.address.trim()) {
      errors.address = "Alamat wajib diisi"
    }

    if (!editedSchool.city.trim()) {
      errors.city = "Kota wajib diisi"
    }

    if (!editedSchool.province.trim()) {
      errors.province = "Provinsi wajib diisi"
    }

    if (!editedSchool.phone.trim()) {
      errors.phone = "Nomor telepon wajib diisi"
    }

    if (!editedSchool.email.trim()) {
      errors.email = "Email wajib diisi"
    } else if (!/^\S+@\S+\.\S+$/.test(editedSchool.email)) {
      errors.email = "Format email tidak valid"
    }

    if (!editedSchool.principalName.trim()) {
      errors.principalName = "Nama kepala sekolah wajib diisi"
    }

    if (editedSchool.studentCount <= 0) {
      errors.studentCount = "Jumlah siswa harus lebih dari 0"
    }

    if (editedSchool.teacherCount <= 0) {
      errors.teacherCount = "Jumlah guru harus lebih dari 0"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveChanges = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the school data in state
      setSchool(editedSchool)

      // Close the dialog
      setIsEditDialogOpen(false)

      // Show success toast
      toast({
        title: "Perubahan disimpan",
        description: "Informasi sekolah berhasil diperbarui",
      })
    } catch (error) {
      toast({
        title: "Gagal menyimpan perubahan",
        description: "Terjadi kesalahan saat memperbarui informasi sekolah",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSchool = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Close the dialog
      setIsDeleteDialogOpen(false)

      // Show success toast
      toast({
        title: "Sekolah dihapus",
        description: "Sekolah berhasil dihapus dari sistem",
      })

      // Redirect to schools list
      router.push("/dashboard/admin/schools")
    } catch (error) {
      toast({
        title: "Gagal menghapus sekolah",
        description: "Terjadi kesalahan saat menghapus sekolah",
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/admin/schools")} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{school.name}</h1>
            <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEditClick} className="flex items-center gap-1">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteClick} className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {school.city}, {school.province}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-primary" />
              Informasi Sekolah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tipe Sekolah</p>
                <div className="flex items-center mt-1">
                  <Badge className={getTypeColor(school.type)}>{school.type === "Public" ? "Negeri" : "Swasta"}</Badge>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Akreditasi</p>
                <div className="flex items-center mt-1">
                  <Badge className={getAccreditationColor(school.accreditation)}>
                    Akreditasi {school.accreditation}
                  </Badge>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Kepala Sekolah</p>
                <p className="font-medium mt-1">{school.principalName}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tahun Berdiri</p>
                <p className="font-medium mt-1">{school.foundedYear}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                <MapPin className="inline-block mr-1 h-4 w-4" />
                Alamat
              </p>
              <p className="font-medium">
                {school.address}, {school.city}, {school.province} {school.postalCode}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                  <Phone className="inline-block mr-1 h-4 w-4" />
                  Telepon
                </p>
                <p className="font-medium">{school.phone}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                  <Mail className="inline-block mr-1 h-4 w-4" />
                  Email
                </p>
                <p className="font-medium">{school.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                <GraduationCap className="inline-block mr-1 h-4 w-4" />
                Website
              </p>
              <p className="font-medium">{school.website}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Statistik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah Siswa</p>
                    <p className="text-2xl font-bold">{school.studentCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah Guru</p>
                    <p className="text-2xl font-bold">{school.teacherCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Guru Aktif di Guru Pintar</p>
                    <p className="text-2xl font-bold">{activeTeachers}</p>
                  </div>
                </div>
                <Badge>{Math.round((activeTeachers / school.teacherCount) * 100)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Paket Berlangganan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.type}</p>
                    </div>
                    <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Periode:</span>
                      <span>
                        {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Penggunaan:</span>
                        <span className="font-medium">
                          {pkg.currentUsers} dari {pkg.maxUsers} pengguna
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            style={{ width: `${pkg.usagePercentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary rounded-full"
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>{pkg.usagePercentage}% terpakai</span>
                          <span>{pkg.maxUsers - pkg.currentUsers} slot tersisa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <Tabs defaultValue="teachers" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="teachers">
                <User className="h-4 w-4 mr-2" />
                Guru
              </TabsTrigger>
              <TabsTrigger value="operators">
                <Users className="h-4 w-4 mr-2" />
                Operator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teachers">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <School className="mr-2 h-5 w-5 text-primary" />
                    Daftar Guru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Cari guru..."
                        value={teacherSearchTerm}
                        onChange={(e) => setTeacherSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredTeachers.length === 0 ? (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                        <h3 className="mt-4 text-lg font-medium">Tidak ada guru ditemukan</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Coba ubah kata kunci pencarian Anda</p>
                      </div>
                    ) : (
                      filteredTeachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center p-4 border rounded-lg">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(teacher.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{teacher.name}</h3>
                              <Badge className={getStatusColor(teacher.status)}>{teacher.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{teacher.subject}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Bergabung: {formatDate(teacher.joinDate)}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {teacher.documentCount} dokumen
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operators">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Daftar Operator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Cari operator..."
                        value={operatorSearchTerm}
                        onChange={(e) => setOperatorSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredOperators.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                        <h3 className="mt-4 text-lg font-medium">Tidak ada operator ditemukan</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Coba ubah kata kunci pencarian Anda</p>
                      </div>
                    ) : (
                      filteredOperators.map((operator) => (
                        <div key={operator.id} className="flex items-center p-4 border rounded-lg">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={operator.avatar} />
                            <AvatarFallback className="bg-cyan-500 text-white">
                              {getInitials(operator.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{operator.name}</h3>
                              <Badge className={getStatusColor(operator.status)}>{operator.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{operator.role}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400">{operator.email}</p>
                              <Badge variant="outline" className="text-xs">
                                Aktif {getTimeAgo(operator.lastActive)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit School Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Informasi Sekolah</DialogTitle>
            <DialogDescription>Perbarui informasi sekolah di bawah ini. Klik simpan setelah selesai.</DialogDescription>
          </DialogHeader>

          {editedSchool && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Sekolah</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedSchool.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="principalName">Nama Kepala Sekolah</Label>
                  <Input
                    id="principalName"
                    name="principalName"
                    value={editedSchool.principalName}
                    onChange={handleInputChange}
                    className={formErrors.principalName ? "border-red-500" : ""}
                  />
                  {formErrors.principalName && <p className="text-sm text-red-500">{formErrors.principalName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Sekolah</Label>
                  <Select value={editedSchool.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe sekolah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Negeri</SelectItem>
                      <SelectItem value="Private">Swasta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditation">Akreditasi</Label>
                  <Select
                    value={editedSchool.accreditation}
                    onValueChange={(value) => handleSelectChange("accreditation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih akreditasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedSchool.status}
                    onValueChange={(value) => handleSelectChange("status", value as "Active" | "Inactive" | "Pending")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Aktif</SelectItem>
                      <SelectItem value="Inactive">Tidak Aktif</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Tahun Berdiri</Label>
                  <Input
                    id="foundedYear"
                    name="foundedYear"
                    type="number"
                    value={editedSchool.foundedYear}
                    onChange={(e) =>
                      handleInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: e.target.name,
                          value: e.target.value,
                        },
                      })
                    }
                    className={formErrors.foundedYear ? "border-red-500" : ""}
                  />
                  {formErrors.foundedYear && <p className="text-sm text-red-500">{formErrors.foundedYear}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={editedSchool.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? "border-red-500" : ""}
                  rows={2}
                />
                {formErrors.address && <p className="text-sm text-red-500">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    name="city"
                    value={editedSchool.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? "border-red-500" : ""}
                  />
                  {formErrors.city && <p className="text-sm text-red-500">{formErrors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <Input
                    id="province"
                    name="province"
                    value={editedSchool.province}
                    onChange={handleInputChange}
                    className={formErrors.province ? "border-red-500" : ""}
                  />
                  {formErrors.province && <p className="text-sm text-red-500">{formErrors.province}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={editedSchool.postalCode}
                    onChange={handleInputChange}
                    className={formErrors.postalCode ? "border-red-500" : ""}
                  />
                  {formErrors.postalCode && <p className="text-sm text-red-500">{formErrors.postalCode}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editedSchool.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedSchool.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={editedSchool.website}
                    onChange={handleInputChange}
                    className={formErrors.website ? "border-red-500" : ""}
                  />
                  {formErrors.website && <p className="text-sm text-red-500">{formErrors.website}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentCount">Jumlah Siswa</Label>
                  <Input
                    id="studentCount"
                    name="studentCount"
                    type="number"
                    value={editedSchool.studentCount}
                    onChange={(e) =>
                      handleInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: e.target.name,
                          value: e.target.value,
                        },
                      })
                    }
                    className={formErrors.studentCount ? "border-red-500" : ""}
                  />
                  {formErrors.studentCount && <p className="text-sm text-red-500">{formErrors.studentCount}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherCount">Jumlah Guru</Label>
                  <Input
                    id="teacherCount"
                    name="teacherCount"
                    type="number"
                    value={editedSchool.teacherCount}
                    onChange={(e) =>
                      handleInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: e.target.name,
                          value: e.target.value,
                        },
                      })
                    }
                    className={formErrors.teacherCount ? "border-red-500" : ""}
                  />
                  {formErrors.teacherCount && <p className="text-sm text-red-500">{formErrors.teacherCount}</p>}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button onClick={handleSaveChanges} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Menyimpan...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Konfirmasi Penghapusan
            </AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus sekolah <span className="font-semibold">{school.name}</span>? Tindakan
              ini tidak dapat dibatalkan dan semua data terkait sekolah ini akan dihapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteSchool()
              }}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Menghapus...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Sekolah
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

