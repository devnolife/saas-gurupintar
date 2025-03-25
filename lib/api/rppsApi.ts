// API service for RPPs (Lesson Plans)
import { MockApiService, type ApiResponse } from "./mockApiService"
import { getCollection, getItemById, addItem, updateItem, deleteItem } from "./mockDatabase"
import type { RPP } from "./mockData/rpps"

export class RPPsApiService extends MockApiService {
  constructor() {
    super("/api/rpps")
  }

  // Get all RPPs with optional filtering
  async getRPPs(params?: {
    search?: string
    subject?: string
    grade?: string
    status?: string
    createdBy?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ rpps: RPP[]; total: number; page: number; limit: number }>> {
    try {
      let rpps = getCollection("rpps") as RPP[]
      const page = params?.page || 1
      const limit = params?.limit || 10
      let total = rpps.length

      // Apply filters if provided
      if (params) {
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          rpps = rpps.filter(
            (rpp) =>
              rpp.title.toLowerCase().includes(searchLower) ||
              rpp.subject.toLowerCase().includes(searchLower) ||
              rpp.createdBy.toLowerCase().includes(searchLower),
          )
        }

        if (params.subject && params.subject !== "all") {
          rpps = rpps.filter((rpp) => rpp.subject === params.subject)
        }

        if (params.grade && params.grade !== "all") {
          rpps = rpps.filter((rpp) => rpp.grade === params.grade)
        }

        if (params.status && params.status !== "all") {
          rpps = rpps.filter((rpp) => rpp.status === params.status)
        }

        if (params.createdBy) {
          rpps = rpps.filter((rpp) => rpp.createdBy.toLowerCase().includes(params.createdBy!.toLowerCase()))
        }

        total = rpps.length
      }

      // Apply pagination
      const startIndex = (page - 1) * limit
      const paginatedRPPs = rpps.slice(startIndex, startIndex + limit)

      return this.simulateRequest({
        rpps: paginatedRPPs,
        total,
        page,
        limit,
      })
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Get an RPP by ID
  async getRPP(id: string): Promise<ApiResponse<RPP>> {
    try {
      const rpp = getItemById("rpps", id) as RPP
      if (!rpp) {
        return {
          data: null,
          error: `RPP with ID ${id} not found`,
          status: 404,
        }
      }

      return this.simulateRequest(rpp)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Create a new RPP
  async createRPP(rppData: Omit<RPP, "id">): Promise<ApiResponse<RPP>> {
    try {
      const newRPP = addItem("rpps", rppData) as RPP
      return this.simulateRequest(newRPP)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Update an RPP
  async updateRPP(id: string, updates: Partial<RPP>): Promise<ApiResponse<RPP>> {
    try {
      const updatedRPP = updateItem("rpps", id, updates) as RPP
      return this.simulateRequest(updatedRPP)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Delete an RPP
  async deleteRPP(id: string): Promise<ApiResponse<RPP>> {
    try {
      const deletedRPP = deleteItem("rpps", id) as RPP
      return this.simulateRequest(deletedRPP)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Override base class methods
  protected async getMockData<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    if (endpoint === "/api/rpps") {
      const response = await this.getRPPs(params)
      return response.data as unknown as T
    }

    const id = endpoint.split("/").pop() || ""
    const response = await this.getRPP(id)
    return response.data as unknown as T
  }

  protected async createMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const response = await this.createRPP(data as unknown as Omit<RPP, "id">)
    return response.data as unknown as U
  }

  protected async updateMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const id = endpoint.split("/").pop() || ""
    const response = await this.updateRPP(id, data as unknown as Partial<RPP>)
    return response.data as unknown as U
  }

  protected async deleteMockData<T>(endpoint: string, id: string): Promise<T> {
    const response = await this.deleteRPP(id)
    return response.data as unknown as T
  }
}

// Create a singleton instance
export const rppsApi = new RPPsApiService()

