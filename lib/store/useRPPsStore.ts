// Zustand store for RPPs (Lesson Plans)
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { rppsApi } from "@/lib/api/rppsApi"
import type { RPP } from "@/lib/api/mockData/rpps"

interface RPPsState {
  rpps: RPP[]
  selectedRPP: RPP | null
  isLoading: boolean
  error: string | null
  totalRPPs: number
  currentPage: number
  limit: number
  filters: {
    search: string
    subject: string
    grade: string
    status: string
    createdBy: string
  }

  // Actions
  fetchRPPs: (page?: number, limit?: number) => Promise<void>
  fetchRPPById: (id: string) => Promise<void>
  createRPP: (rppData: Omit<RPP, "id">) => Promise<boolean>
  updateRPP: (id: string, updates: Partial<RPP>) => Promise<boolean>
  deleteRPP: (id: string) => Promise<boolean>
  setFilters: (filters: Partial<RPPsState["filters"]>) => void
  resetFilters: () => void
  setSelectedRPP: (rpp: RPP | null) => void
}

// Create the store
export const useRPPsStore = create<RPPsState>()(
  devtools(
    persist(
      (set, get) => ({
        rpps: [],
        selectedRPP: null,
        isLoading: false,
        error: null,
        totalRPPs: 0,
        currentPage: 1,
        limit: 10,
        filters: {
          search: "",
          subject: "all",
          grade: "all",
          status: "all",
          createdBy: "",
        },

        // Fetch RPPs with pagination and filters
        fetchRPPs: async (page = 1, limit = 10) => {
          const { filters } = get()
          set({ isLoading: true, error: null })

          try {
            const response = await rppsApi.getRPPs({
              search: filters.search,
              subject: filters.subject !== "all" ? filters.subject : undefined,
              grade: filters.grade !== "all" ? filters.grade : undefined,
              status: filters.status !== "all" ? filters.status : undefined,
              createdBy: filters.createdBy || undefined,
              page,
              limit,
            })

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({
                rpps: response.data.rpps,
                totalRPPs: response.data.total,
                currentPage: response.data.page,
                limit: response.data.limit,
                isLoading: false,
              })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch RPPs",
              isLoading: false,
            })
          }
        },

        // Fetch a single RPP by ID
        fetchRPPById: async (id: string) => {
          set({ isLoading: true, error: null })

          try {
            const response = await rppsApi.getRPP(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            if (response.data) {
              set({ selectedRPP: response.data, isLoading: false })
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch RPP",
              isLoading: false,
            })
          }
        },

        // Create a new RPP
        createRPP: async (rppData: Omit<RPP, "id">) => {
          set({ isLoading: true, error: null })

          try {
            const response = await rppsApi.createRPP(rppData)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Refresh the RPPs list
            await get().fetchRPPs()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to create RPP",
              isLoading: false,
            })
            return false
          }
        },

        // Update an RPP
        updateRPP: async (id: string, updates: Partial<RPP>) => {
          set({ isLoading: true, error: null })

          try {
            const response = await rppsApi.updateRPP(id, updates)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Update the selected RPP if it's the one being updated
            const { selectedRPP } = get()
            if (selectedRPP && selectedRPP.id === id) {
              set({ selectedRPP: response.data })
            }

            // Refresh the RPPs list
            await get().fetchRPPs()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to update RPP",
              isLoading: false,
            })
            return false
          }
        },

        // Delete an RPP
        deleteRPP: async (id: string) => {
          set({ isLoading: true, error: null })

          try {
            const response = await rppsApi.deleteRPP(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return false
            }

            // Clear selected RPP if it's the one being deleted
            const { selectedRPP } = get()
            if (selectedRPP && selectedRPP.id === id) {
              set({ selectedRPP: null })
            }

            // Refresh the RPPs list
            await get().fetchRPPs()
            set({ isLoading: false })
            return true
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to delete RPP",
              isLoading: false,
            })
            return false
          }
        },

        // Set filters
        setFilters: (filters: Partial<RPPsState["filters"]>) => {
          set({ filters: { ...get().filters, ...filters } })
          // Fetch RPPs with new filters
          get().fetchRPPs(1, get().limit)
        },

        // Reset filters
        resetFilters: () => {
          set({
            filters: {
              search: "",
              subject: "all",
              grade: "all",
              status: "all",
              createdBy: "",
            },
          })
          // Fetch RPPs with reset filters
          get().fetchRPPs(1, get().limit)
        },

        // Set selected RPP
        setSelectedRPP: (rpp: RPP | null) => {
          set({ selectedRPP: rpp })
        },
      }),
      {
        name: "rpps-store",
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

