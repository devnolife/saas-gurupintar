// Zustand store for teachers
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { teachersApi } from "@/lib/api/teachersApi"
import type { Teacher } from "@/lib/api/mockData/teachers"

interface TeachersState {
  teachers: Teacher[]
  selectedTeacher: Teacher | null
  isLoading: boolean
  error: string | null
  totalTeachers: number
  currentPage: number
  limit: number
  filters: {
    search: string
    status: string
    subject: string
    school: string
  }

  // Actions
  fetchTeachers: (page?: number, limit?: number) => Promise<void>
  fetchTeacherById: (id: number) => Promise<void>
  createTeacher: (teacherData: Omit<Teacher, "id">) => Promise<boolean>
  updateTeacher: (id: number, updates: Partial<Teacher>) => Promise<boolean>
  deleteTeacher: (id: number) => Promise<boolean>
  setFilters: (filters: Partial<TeachersState["filters"]>) => void
  resetFilters: () => void
  setSelectedTeacher: (teacher: Teacher | null) => void
}

// Create the store
export const useTeachersStore = create<TeachersState>()(
  devtools(
    persist(
      (set, get) => ({
        teachers: [],
        selectedTeacher: null,
        isLoading: false,
        error: null,
        totalTeachers: 0,
        currentPage: 1,
        limit: 10,
        filters: {
          search: "",
          status: "all",
          subject: "all",
          school: "all",
        },

        // Fetch teachers with pagination and filters
        fetchTeachers: async (page = 1, limit = 10) => {
          const { filters } = get()
          set({ isLoading: true, error: null })

          try {
            const response = await teachersApi.getTeachers({
              search: filters.search,
              status: filters.status !== "all" ? filters.status : undefined,
              subject: filters.subject !== "all" ? filters.subject : undefined,
              school: filters.school !== "all" ? filters.school : undefined,
              page,
              limit,
            })

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({
                teachers: response.data.teachers,
                totalTeachers: response.data.total,
                currentPage: response.data.page,
                limit: response.data.limit,
                isLoading: false,
              })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch teachers",
              isLoading: false,
            })
          }
        },

        // Fetch a single teacher by ID
        fetchTeacherById: async (id: number) => {
          set({ isLoading: true, error: null })

          try {
            const response = await teachersApi.getTeacher(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({ selectedTeacher: response.data, isLoading: false })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch teacher",
              isLoading: false,
            })
          }
        },

        // Create a new teacher
        createTeacher: async (teacherData: Omit<Teacher, "id">) => {
          set({ isLoading: true, error: null })

          try {
            const response = await teachersApi.createTeacher(teacherData)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Refresh the teachers list
            await get().fetchTeachers()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to create teacher",
              isLoading: false,
            })
            return false
          }
        },

        // Update a teacher
        updateTeacher: async (id: number, updates: Partial<Teacher>) => {
          set({ isLoading: true, error: null })

          try {
            const response = await teachersApi.updateTeacher(id, updates)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Update the selected teacher if it's the one being updated
            const { selectedTeacher } = get()
            if (selectedTeacher && selectedTeacher.id === id) {
              set({ selectedTeacher: response.data })
            }

            // Refresh the teachers list
            await get().fetchTeachers()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to update teacher",
              isLoading: false,
            })
            return false
          }
        },

        // Delete a teacher
        deleteTeacher: async (id: number) => {
          set({ isLoading: true, error: null })

          try {
            const response = await teachersApi.deleteTeacher(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Clear selected teacher if it's the one being deleted
            const { selectedTeacher } = get()
            if (selectedTeacher && selectedTeacher.id === id) {
              set({ selectedTeacher: null })
            }

            // Refresh the teachers list
            await get().fetchTeachers()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to delete teacher",
              isLoading: false,
            })
            return false
          }
        },

        // Set filters
        setFilters: (filters: Partial<TeachersState["filters"]>) => {
          set({ filters: { ...get().filters, ...filters } })
          // Fetch teachers with new filters
          get().fetchTeachers(1, get().limit)
        },

        // Reset filters
        resetFilters: () => {
          set({
            filters: {
              search: "",
              status: "all",
              subject: "all",
              school: "all",
            },
          })
          // Fetch teachers with reset filters
          get().fetchTeachers(1, get().limit)
        },

        // Set selected teacher
        setSelectedTeacher: (teacher: Teacher | null) => {
          set({ selectedTeacher: teacher })
        },
      }),
      {
        name: "teachers-store",
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

