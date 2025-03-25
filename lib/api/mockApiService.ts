// Mock API service to simulate backend API calls
import { generateRandomDelay } from "@/lib/utils"

// Generic type for API response
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

// Base API service class
export class MockApiService {
  private baseUrl: string
  private shouldSimulateErrors: boolean
  private errorRate: number

  constructor(baseUrl = "/api", shouldSimulateErrors = true, errorRate = 0.1) {
    this.baseUrl = baseUrl
    this.shouldSimulateErrors = shouldSimulateErrors
    this.errorRate = errorRate
  }

  // Simulate network delay and potential errors
  private async simulateRequest<T>(data: T): Promise<ApiResponse<T>> {
    // Simulate network delay (between 200-800ms)
    const delay = generateRandomDelay(200, 800)
    await new Promise((resolve) => setTimeout(resolve, delay))

    // Randomly simulate errors if enabled
    if (this.shouldSimulateErrors && Math.random() < this.errorRate) {
      return {
        data: null,
        error: "Simulated server error",
        status: 500,
      }
    }

    return {
      data,
      error: null,
      status: 200,
    }
  }

  // Generic GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      // In a real app, this would be a fetch call
      // Here we'll just return the data from our mock database
      const mockData = await this.getMockData<T>(endpoint, params)
      return this.simulateRequest<T>(mockData)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Generic POST request
  async post<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
    try {
      // In a real app, this would be a fetch call
      // Here we'll just simulate creating/updating data
      const mockResponse = await this.createMockData<T, U>(endpoint, data)
      return this.simulateRequest<U>(mockResponse)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Generic PUT request
  async put<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
    try {
      // In a real app, this would be a fetch call
      // Here we'll just simulate updating data
      const mockResponse = await this.updateMockData<T, U>(endpoint, data)
      return this.simulateRequest<U>(mockResponse)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Generic DELETE request
  async delete<T>(endpoint: string, id: string | number): Promise<ApiResponse<T>> {
    try {
      // In a real app, this would be a fetch call
      // Here we'll just simulate deleting data
      const mockResponse = await this.deleteMockData<T>(endpoint, id)
      return this.simulateRequest<T>(mockResponse)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // These methods will be implemented by specific API services
  protected async getMockData<T>(_endpoint: string, _params?: Record<string, any>): Promise<T> {
    throw new Error("getMockData must be implemented by subclasses")
  }

  protected async createMockData<T, U>(_endpoint: string, _data: T): Promise<U> {
    throw new Error("createMockData must be implemented by subclasses")
  }

  protected async updateMockData<T, U>(_endpoint: string, _data: T): Promise<U> {
    throw new Error("updateMockData must be implemented by subclasses")
  }

  protected async deleteMockData<T>(_endpoint: string, _id: string | number): Promise<T> {
    throw new Error("deleteMockData must be implemented by subclasses")
  }
}

