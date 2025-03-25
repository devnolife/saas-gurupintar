// API service for teachers
import { MockApiService, type ApiResponse } from "./mockApiService"
import { getCollection, getItemById, addItem, updateItem, deleteItem } from "./mockDatabase"
import type { Teacher } from "./mockData/teachers"

export class TeachersApiService extends MockApiService {
  constructor() {
    super("/api/teachers")
  }

  // Get all teachers with optional filtering
  async getTeachers(params?: {
    search?: string
    status?: string
    subject?: string
    school?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ teachers: Teacher[]; total: number; page: number; limit: number }>> {
    try {
      let teachers = getCollection("teachers") as Teacher[]
      const page = params?.page || 1
      const limit = params?.limit || 10
      let total = teachers.length

      // Apply filters if provided
      if (params) {
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          teachers = teachers.filter(
            (teacher) =>
              teacher.name.toLowerCase().includes(searchLower) ||
              teacher.email.toLowerCase().includes(searchLower) ||
              teacher.subject.toLowerCase().includes(searchLower) ||
              teacher.school.toLowerCase().includes(searchLower),
          )
        }

        if (params.status && params.status !== "all") {
          teachers = teachers.filter((teacher) => teacher.status === params.status)
        }

        if (params.subject && params.subject !== "all") {
          teachers = teachers.filter((teacher) => teacher.subject === params.subject)
        }

        if (params.school && params.school !== "all") {
          teachers = teachers.filter((teacher) => teacher.school === params.school)
        }

        total = teachers.length
      }

      // Apply pagination
      const startIndex = (page - 1) * limit
      const paginatedTeachers = teachers.slice(startIndex, startIndex + limit)

      return this.simulateRequest({
        teachers: paginatedTeachers,
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

  // Get a teacher by ID
  async getTeacher(id: number): Promise<ApiResponse<Teacher>> {
    try {
      const teacher = getItemById("teachers", id) as Teacher
      if (!teacher) {
        return {
          data: null,
          error: `Teacher with ID ${id} not found`,
          status: 404,
        }
      }

      return this.simulateRequest(teacher)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Create a new teacher
  async createTeacher(teacherData: Omit<Teacher, "id">): Promise<ApiResponse<Teacher>> {
    try {
      const newTeacher = addItem("teachers", teacherData) as Teacher
      return this.simulateRequest(newTeacher)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Update a teacher
  async updateTeacher(id: number, updates: Partial<Teacher>): Promise<ApiResponse<Teacher>> {
    try {
      const updatedTeacher = updateItem("teachers", id, updates) as Teacher
      return this.simulateRequest(updatedTeacher)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Delete a teacher
  async deleteTeacher(id: number): Promise<ApiResponse<Teacher>> {
    try {
      const deletedTeacher = deleteItem("teachers", id) as Teacher
      return this.simulateRequest(deletedTeacher)
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
    if (endpoint === "/api/teachers") {
      const response = await this.getTeachers(params)
      return response.data as unknown as T
    }

    const id = Number.parseInt(endpoint.split("/").pop() || "0")
    const response = await this.getTeacher(id)
    return response.data as unknown as T
  }

  protected async createMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const response = await this.createTeacher(data as unknown as Omit<Teacher, "id">)
    return response.data as unknown as U
  }

  protected async updateMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const id = Number.parseInt(endpoint.split("/").pop() || "0")
    const response = await this.updateTeacher(id, data as unknown as Partial<Teacher>)
    return response.data as unknown as U
  }

  protected async deleteMockData<T>(endpoint: string, id: number): Promise<T> {
    const response = await this.deleteTeacher(id)
    return response.data as unknown as T
  }
}

// Create a singleton instance
export const teachersApi = new TeachersApiService()

