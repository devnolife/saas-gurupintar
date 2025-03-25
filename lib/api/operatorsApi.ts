import { MockApiService, type ApiResponse } from "./mockApiService"
import {
  type Operator,
  generateMockOperators,
  mockRoles,
  mockPermissions,
  type Role,
  type Permission,
} from "./mockData/operators"

// In-memory database for operators
const operators: Operator[] = generateMockOperators(20)

export class OperatorsApiService extends MockApiService {
  constructor() {
    super("/api/operators")
  }

  // Get all operators
  async getOperators(params?: Record<string, any>): Promise<ApiResponse<Operator[]>> {
    return this.get<Operator[]>("/operators", params)
  }

  // Get operator by ID
  async getOperator(id: string): Promise<ApiResponse<Operator>> {
    return this.get<Operator>(`/operators/${id}`)
  }

  // Create a new operator
  async createOperator(operator: Partial<Operator>): Promise<ApiResponse<Operator>> {
    return this.post<Partial<Operator>, Operator>("/operators", operator)
  }

  // Update an operator
  async updateOperator(id: string, updates: Partial<Operator>): Promise<ApiResponse<Operator>> {
    return this.put<Partial<Operator>, Operator>(`/operators/${id}`, updates)
  }

  // Delete an operator
  async deleteOperator(id: string): Promise<ApiResponse<Operator>> {
    return this.delete<Operator>("/operators", id)
  }

  // Reset operator password
  async resetPassword(id: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return this.post<{}, { success: boolean; message: string }>(`/operators/${id}/reset-password`, {})
  }

  // Get all roles
  async getRoles(): Promise<ApiResponse<Role[]>> {
    return this.get<Role[]>("/roles")
  }

  // Get all permissions
  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return this.get<Permission[]>("/permissions")
  }

  // Override getMockData to return operators, roles, and permissions
  protected async getMockData<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    if (endpoint === "/operators") {
      // Filter operators based on params
      let filteredOperators = [...operators]

      if (params) {
        if (params.status) {
          filteredOperators = filteredOperators.filter((op) => op.status === params.status)
        }

        if (params.role) {
          filteredOperators = filteredOperators.filter((op) => op.role === params.role)
        }

        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredOperators = filteredOperators.filter(
            (op) => op.name.toLowerCase().includes(searchLower) || op.email.toLowerCase().includes(searchLower),
          )
        }

        if (params.region) {
          filteredOperators = filteredOperators.filter((op) => op.region === params.region)
        }
      }

      return filteredOperators as unknown as T
    }

    if (endpoint.startsWith("/operators/") && endpoint.includes("/reset-password")) {
      return {
        success: true,
        message: "Password reset email sent successfully",
      } as unknown as T
    }

    if (endpoint.startsWith("/operators/") && endpoint.length > 11) {
      const id = endpoint.substring(11)
      const operator = operators.find((op) => op.id === id)

      if (operator) {
        return operator as unknown as T
      }

      throw new Error("Operator not found")
    }

    if (endpoint === "/roles") {
      return mockRoles as unknown as T
    }

    if (endpoint === "/permissions") {
      return mockPermissions as unknown as T
    }

    throw new Error(`Endpoint ${endpoint} not supported`)
  }

  // Override createMockData to create a new operator
  protected async createMockData<T, U>(endpoint: string, data: T): Promise<U> {
    if (endpoint === "/operators") {
      const newOperator = data as unknown as Operator

      // Generate a new ID if not provided
      if (!newOperator.id) {
        const maxId = Math.max(...operators.map((op) => Number.parseInt(op.id.substring(3))))
        newOperator.id = `op-${(maxId + 1).toString().padStart(3, "0")}`
      }

      operators.push(newOperator)
      return newOperator as unknown as U
    }

    throw new Error(`Endpoint ${endpoint} not supported`)
  }

  // Override updateMockData to update an operator
  protected async updateMockData<T, U>(endpoint: string, data: T): Promise<U> {
    if (endpoint.startsWith("/operators/") && endpoint.length > 11) {
      const id = endpoint.substring(11)
      const index = operators.findIndex((op) => op.id === id)

      if (index !== -1) {
        const updatedOperator = {
          ...operators[index],
          ...data,
        }

        operators[index] = updatedOperator as Operator
        return updatedOperator as unknown as U
      }

      throw new Error("Operator not found")
    }

    throw new Error(`Endpoint ${endpoint} not supported`)
  }

  // Override deleteMockData to delete an operator
  protected async deleteMockData<T>(endpoint: string, id: string | number): Promise<T> {
    if (endpoint === "/operators") {
      const index = operators.findIndex((op) => op.id === id)

      if (index !== -1) {
        const deletedOperator = operators[index]
        operators.splice(index, 1)
        return deletedOperator as unknown as T
      }

      throw new Error("Operator not found")
    }

    throw new Error(`Endpoint ${endpoint} not supported`)
  }
}

// Create a singleton instance
export const operatorsApi = new OperatorsApiService()

