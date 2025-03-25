// Zustand store for students
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { studentsApi } from "@/lib/api/studentsApi"
import type { Student } from "@/lib/api/mockData/students"

interface StudentsState {
  students: Student[]
  selectedStudent: Student | null
  isLoading: boolean
  error: string | null
  totalStudents: number
  currentPage: number
  limit: number
  filters: {
    search: string
    status: string
    grade: string
    class: string
  }

  // Actions
  fetchStudents: (page?: number, limit?: number) => Promise<void>
  fetchStudentById: (id: number) => Promise<void>
  createStudent: (studentData: Omit<Student, "id">) => Promise<boolean>
  updateStudent: (id: number, updates: Partial<Student>) => Promise<boolean>
  deleteStudent: (id: number) => Promise<boolean>
  setFilters: (filters: Partial<StudentsState["filters"]>) => void
  resetFilters: () => void
  setSelectedStudent: (student: Student | null) => void
}

// Create the store
export const useStudentsStore = create<StudentsState>()(
  devtools(
    persist(
      (set, get) => ({
        students: [],
        selectedStudent: null,
        isLoading: false,
        error: null,
        totalStudents: 0,
        currentPage: 1,
        limit: 10,
        filters: {
          search: "",
          status: "all",
          grade: "all",
          class: "all",
        },

        // Fetch students with pagination and filters
        fetchStudents: async (page = 1, limit = 10) => {
          const { filters } = get()
          set({ isLoading: true, error: null })

          try {
            const response = await studentsApi.getStudents({
              search: filters.search,
              status: filters.status !== "all" ? filters.status : undefined,
              grade: filters.grade !== "all" ? filters.grade : undefined,
              class: filters.class !== "all" ? filters.class : undefined,
              page,
              limit,
            })

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({
                students: response.data.students,
                totalStudents: response.data.total,
                currentPage: response.data.page,
                limit: response.data.limit,
                isLoading: false,
              })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch students",
              isLoading: false,
            })
          }
        },

        // Fetch a single student by ID
        fetchStudentById: async (id: number) => {
          set({ isLoading: true, error: null })

          try {
            const response = await studentsApi.getStudent(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({ selectedStudent: response.data, isLoading: false })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch student",
              isLoading: false,
            })
          }
        },

        // Create a new student
        createStudent: async (studentData: Omit<Student, "id">) => {
          set({ isLoading: true, error: null })

          try {
            const response = await studentsApi.createStudent(studentData)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Refresh the students list
            await get().fetchStudents()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to create student",
              isLoading: false,
            })
            return false
          }
        },

        // Update a student
        updateStudent: async (id: number, updates: Partial<Student>) => {
          set({ isLoading: true, error: null })

          try {
            const response = await studentsApi.updateStudent(id, updates)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Update the selected student if it's the one being updated
            const { selectedStudent } = get()
            if (selectedStudent && selectedStudent.id === id) {
              set({ selectedStudent: response.data })
            }

            // Refresh the students list
            await get().fetchStudents()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to update student",
              isLoading: false,
            })
            return false
          }
        },

        // Delete a student
        deleteStudent: async (id: number) => {
          set({ isLoading: true, error: null })

          try {
            const response = await studentsApi.deleteStudent(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Clear selected student if it's the one being deleted
            const { selectedStudent } = get()
            if (selectedStudent && selectedStudent.id === id) {
              set({ selectedStudent: null })
            }

            // Refresh the students list
            await get().fetchStudents()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to delete student",
              isLoading: false,
            })
            return false
          }
        },

        // Set filters
        setFilters: (filters: Partial<StudentsState["filters"]>) => {
          set({ filters: { ...get().filters, ...filters } })
          // Fetch students with new filters
          get().fetchStudents(1, get().limit)
        },

        // Reset filters
        resetFilters: () => {
          set({
            filters: {
              search: "",
              status: "all",
              grade: "all",
              class: "all",
            },
          })
          // Fetch students with reset filters
          get().fetchStudents(1, get().limit)
        },

        // Set selected student
        setSelectedStudent: (student: Student | null) => {
          set({ selectedStudent: student })
        },
      }),
      {
        name: "students-store",
        partialize: (state) => ({
          // Only persist these fields
          filters: state.filters,
          currentPage: state.currentPage,
          limit: state.limit,
        }),
      },
    ),
  ),
)

