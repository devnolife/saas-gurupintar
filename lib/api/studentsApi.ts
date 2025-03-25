// API service for students
import { MockApiService, type ApiResponse } from "./mockApiService"
import { getCollection, getItemById, addItem, updateItem, deleteItem } from "./mockDatabase"
import type { Student } from "./mockData/students"

export class StudentsApiService extends MockApiService {
  constructor() {
    super("/api/students")
  }

  // Get all students with optional filtering
  async getStudents(params?: {
    search?: string
    status?: string
    grade?: string
    class?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ students: Student[]; total: number; page: number; limit: number }>> {
    try {
      let students = getCollection("students") as Student[]
      const page = params?.page || 1
      const limit = params?.limit || 10
      let total = students.length

      // Apply filters if provided
      if (params) {
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          students = students.filter(
            (student) =>
              student.name.toLowerCase().includes(searchLower) ||
              student.email.toLowerCase().includes(searchLower) ||
              student.parentName.toLowerCase().includes(searchLower),
          )
        }

        if (params.status && params.status !== "all") {
          students = students.filter((student) => student.status === params.status)
        }

        if (params.grade && params.grade !== "all") {
          students = students.filter((student) => student.grade === params.grade)
        }

        if (params.class && params.class !== "all") {
          students = students.filter((student) => student.class === params.class)
        }

        total = students.length
      }

      // Apply pagination
      const startIndex = (page - 1) * limit
      const paginatedStudents = students.slice(startIndex, startIndex + limit)

      return this.simulateRequest({
        students: paginatedStudents,
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

  // Get a student by ID
  async getStudent(id: number): Promise<ApiResponse<Student>> {
    try {
      const student = getItemById("students", id) as Student
      if (!student) {
        return {
          data: null,
          error: `Student with ID ${id} not found`,
          status: 404,
        }
      }

      return this.simulateRequest(student)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Create a new student
  async createStudent(studentData: Omit<Student, "id">): Promise<ApiResponse<Student>> {
    try {
      const newStudent = addItem("students", studentData) as Student
      return this.simulateRequest(newStudent)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Update a student
  async updateStudent(id: number, updates: Partial<Student>): Promise<ApiResponse<Student>> {
    try {
      const updatedStudent = updateItem("students", id, updates) as Student
      return this.simulateRequest(updatedStudent)
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      }
    }
  }

  // Delete a student
  async deleteStudent(id: number): Promise<ApiResponse<Student>> {
    try {
      const deletedStudent = deleteItem("students", id) as Student
      return this.simulateRequest(deletedStudent)
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
    if (endpoint === "/api/students") {
      const response = await this.getStudents(params)
      return response.data as unknown as T
    }

    const id = Number.parseInt(endpoint.split("/").pop() || "0")
    const response = await this.getStudent(id)
    return response.data as unknown as T
  }

  protected async createMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const response = await this.createStudent(data as unknown as Omit<Student, "id">)
    return response.data as unknown as U
  }

  protected async updateMockData<T, U>(endpoint: string, data: T): Promise<U> {
    const id = Number.parseInt(endpoint.split("/").pop() || "0")
    const response = await this.updateStudent(id, data as unknown as Partial<Student>)
    return response.data as unknown as U
  }

  protected async deleteMockData<T>(endpoint: string, id: number): Promise<T> {
    const response = await this.deleteStudent(id)
    return response.data as unknown as T
  }
}

// Create a singleton instance
export const studentsApi = new StudentsApiService()

