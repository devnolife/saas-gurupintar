// Mock database to store data in memory
import { generateMockTeachers } from "./mockData/teachers"
import { generateMockStudents } from "./mockData/students"
import { generateMockUsers } from "./mockData/users"
import { generateMockSchools } from "./mockData/schools"
import { generateMockOperators } from "./mockData/operators"
import { generateMockRPPs } from "./mockData/rpps"
import { generateMockAchievements } from "./mockData/achievements"
import { generateMockEvents } from "./mockData/events"

// Define the structure of our mock database
export interface MockDatabase {
  users: any[]
  teachers: any[]
  students: any[]
  schools: any[]
  operators: any[]
  rpps: any[]
  achievements: any[]
  events: any[]
  [key: string]: any[] // Allow indexing with string
}

// Initialize the mock database with generated data
let mockDatabase: MockDatabase = {
  users: [],
  teachers: [],
  students: [],
  schools: [],
  operators: [],
  rpps: [],
  achievements: [],
  events: [],
}

// Function to initialize the database with mock data
export function initializeMockDatabase() {
  mockDatabase = {
    users: generateMockUsers(50),
    teachers: generateMockTeachers(100),
    students: generateMockStudents(500),
    schools: generateMockSchools(20),
    operators: generateMockOperators(25),
    rpps: generateMockRPPs(200),
    achievements: generateMockAchievements(50),
    events: generateMockEvents(30),
  }

  return mockDatabase
}

// Function to get the mock database
export function getMockDatabase(): MockDatabase {
  // Initialize if not already initialized
  if (mockDatabase.users.length === 0) {
    return initializeMockDatabase()
  }
  return mockDatabase
}

// Function to reset the mock database
export function resetMockDatabase() {
  return initializeMockDatabase()
}

// Helper functions for CRUD operations on the mock database
export function getCollection(collectionName: string) {
  const db = getMockDatabase()
  return db[collectionName] || []
}

export function getItemById(collectionName: string, id: string | number) {
  const collection = getCollection(collectionName)
  return collection.find((item) => item.id === id)
}

export function addItem(collectionName: string, item: any) {
  const db = getMockDatabase()
  const collection = [...db[collectionName]]

  // Generate a new ID if not provided
  if (!item.id) {
    const maxId = collection.reduce((max, current) => {
      const currentId = typeof current.id === "number" ? current.id : Number.parseInt(current.id)
      return currentId > max ? currentId : max
    }, 0)
    item.id = maxId + 1
  }

  collection.push(item)
  db[collectionName] = collection
  return item
}

export function updateItem(collectionName: string, id: string | number, updates: any) {
  const db = getMockDatabase()
  const collection = [...db[collectionName]]
  const index = collection.findIndex((item) => item.id === id)

  if (index !== -1) {
    collection[index] = { ...collection[index], ...updates }
    db[collectionName] = collection
    return collection[index]
  }

  throw new Error(`Item with id ${id} not found in ${collectionName}`)
}

export function deleteItem(collectionName: string, id: string | number) {
  const db = getMockDatabase()
  const collection = [...db[collectionName]]
  const index = collection.findIndex((item) => item.id === id)

  if (index !== -1) {
    const deletedItem = collection[index]
    collection.splice(index, 1)
    db[collectionName] = collection
    return deletedItem
  }

  throw new Error(`Item with id ${id} not found in ${collectionName}`)
}

// Initialize the database
initializeMockDatabase()

