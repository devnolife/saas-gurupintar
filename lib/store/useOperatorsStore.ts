import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { Operator, Role, Permission } from "@/lib/api/mockData/operators"
import { operatorsApi } from "@/lib/api/operatorsApi"

interface OperatorsFilters {
  status?: string
  role?: string
  search?: string
  region?: string
}

interface OperatorsState {
  operators: Operator[]
  selectedOperator: Operator | null
  roles: Role[]
  permissions: Permission[]
  isLoading: boolean
  error: string | null
  filters: OperatorsFilters

  // Actions
  fetchOperators: (filters?: OperatorsFilters) => Promise<void>
  fetchOperator: (id: string) => Promise<void>
  createOperator: (operator: Partial<Operator>) => Promise<void>
  updateOperator: (id: string, updates: Partial<Operator>) => Promise<void>
  deleteOperator: (id: string) => Promise<void>
  resetPassword: (id: string) => Promise<{ success: boolean; message: string }>
  fetchRoles: () => Promise<void>
  fetchPermissions: () => Promise<void>
  setFilters: (filters: OperatorsFilters) => void
  clearFilters: () => void
  getOperator: (id: string) => Operator | undefined
  addOperator: (operator: Operator) => Promise<void>
}

export const useOperatorsStore = create<OperatorsState>()(
  devtools(
    persist(
      (set, get) => ({
        operators: [],
        selectedOperator: null,
        roles: [],
        permissions: [],
        isLoading: false,
        error: null,
        filters: {},

        fetchOperators: async (filters?: OperatorsFilters) => {
          set({ isLoading: true, error: null })
          try {
            const appliedFilters = filters || get().filters
            const response = await operatorsApi.getOperators(appliedFilters)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set({
              operators: response.data || [],
              isLoading: false,
              filters: appliedFilters,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch operators",
              isLoading: false,
            })
          }
        },

        fetchOperator: async (id: string) => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.getOperator(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set({ selectedOperator: response.data, isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch operator",
              isLoading: false,
            })
          }
        },

        createOperator: async (operator: Partial<Operator>) => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.createOperator(operator)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set((state) => ({
              operators: [...state.operators, response.data as Operator],
              isLoading: false,
            }))
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to create operator",
              isLoading: false,
            })
          }
        },

        updateOperator: async (id: string, updates: Partial<Operator>) => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.updateOperator(id, updates)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set((state) => ({
              operators: state.operators.map((op) => (op.id === id ? ({ ...op, ...response.data } as Operator) : op)),
              selectedOperator:
                state.selectedOperator?.id === id
                  ? ({ ...state.selectedOperator, ...response.data } as Operator)
                  : state.selectedOperator,
              isLoading: false,
            }))
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to update operator",
              isLoading: false,
            })
          }
        },

        deleteOperator: async (id: string) => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.deleteOperator(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set((state) => ({
              operators: state.operators.filter((op) => op.id !== id),
              selectedOperator: state.selectedOperator?.id === id ? null : state.selectedOperator,
              isLoading: false,
            }))
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to delete operator",
              isLoading: false,
            })
          }
        },

        resetPassword: async (id: string) => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.resetPassword(id)

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return { success: false, message: response.error }
            }

            set({ isLoading: false })
            return response.data || { success: true, message: "Password reset successful" }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to reset password"
            set({ error: errorMessage, isLoading: false })
            return { success: false, message: errorMessage }
          }
        },

        fetchRoles: async () => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.getRoles()

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set({ roles: response.data || [], isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch roles",
              isLoading: false,
            })
          }
        },

        fetchPermissions: async () => {
          set({ isLoading: true, error: null })
          try {
            const response = await operatorsApi.getPermissions()

            if (response.error) {
              set({ error: response.error, isLoading: false })
              return
            }

            set({ permissions: response.data || [], isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch permissions",
              isLoading: false,
            })
          }
        },

        setFilters: (filters: OperatorsFilters) => {
          set({ filters })
          get().fetchOperators(filters)
        },

        clearFilters: () => {
          set({ filters: {} })
          get().fetchOperators({})
        },

        getOperator: (id: string) => {
          const { operators } = get()
          return operators.find((operator) => operator.id === id)
        },

        addOperator: async (operator: Operator) => {
          // In a real app, you would make an API call here
          set((state) => ({
            operators: [...state.operators, operator],
          }))
        },

        updateOperator: async (id: string, data: Partial<Operator>) => {
          // In a real app, you would make an API call here
          set((state) => ({
            operators: state.operators.map((operator) => (operator.id === id ? { ...operator, ...data } : operator)),
          }))
        },

        deleteOperator: async (id: string) => {
          // In a real app, you would make an API call here
          set((state) => ({
            operators: state.operators.filter((operator) => operator.id !== id),
          }))
        },
      }),
      {
        name: "operators-store",
        partialize: (state) => ({ filters: state.filters }),
      },
    ),
  ),
)

