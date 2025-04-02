// This script tests the complete API flow: login as admin -> create teacher -> verify creation
const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123'
};
const TEST_TEACHER = {
  name: 'Test Teacher',
  email: 'test.teacher@example.com',
  password: 'teacher123',
  phone: '+62 812-3456-7890',
  address: 'Jl. Test Address No. 123',
  bio: 'This is a test teacher account created by the API test script',
  subject: 'Mathematics',
  qualification: 'Bachelor of Education',
  experience: '5'
};

// Store auth token and created teacher id
let authToken;
let createdTeacherId;

// Helper function for API requests
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      headers,
      data: body
    });
    
    return { response, data: response.data };
  } catch (error) {
    if (error.response) {
      return { 
        response: error.response, 
        data: error.response.data 
      };
    }
    throw error;
  }
}

// 1. Admin Login
async function adminLogin() {
  console.log('Step 1: Admin Login');
  try {
    const { response, data } = await apiRequest('auth/login', 'POST', ADMIN_CREDENTIALS);
    
    if (response.status !== 200) {
      throw new Error(`Login failed: ${data.error || 'Unknown error'}`);
    }
    
    console.log('✅ Admin login successful');
    authToken = data.token; // Assuming token is part of response
    console.log(`Auth token: ${authToken}`);
    return data.user;
  } catch (error) {
    console.error('❌ Admin login failed:', error.message);
    process.exit(1);
  }
}

// 2. Create Teacher
async function createTeacher() {
  console.log('\nStep 2: Create Teacher');
  try {
    const { response, data } = await apiRequest('teachers', 'POST', TEST_TEACHER, authToken);
    
    if (response.status !== 201) {
      throw new Error(`Create teacher failed: ${data.error || 'Unknown error'}`);
    }
    
    console.log('✅ Teacher created successfully');
    createdTeacherId = data.id;
    console.log(`Teacher ID: ${createdTeacherId}`);
    console.log('Teacher data:', data);
    return data;
  } catch (error) {
    console.error('❌ Teacher creation failed:', error.message);
    process.exit(1);
  }
}

// 3. Verify Teacher Creation
async function verifyTeacher() {
  console.log('\nStep 3: Verify Teacher Creation');
  try {
    const { response, data } = await apiRequest(`teachers/${createdTeacherId}`, 'GET', null, authToken);
    
    if (response.status !== 200) {
      throw new Error(`Teacher verification failed: ${data.error || 'Unknown error'}`);
    }
    
    console.log('✅ Teacher verification successful');
    console.log('Retrieved teacher data:', data);
    return data;
  } catch (error) {
    console.error('❌ Teacher verification failed:', error.message);
    process.exit(1);
  }
}

// Run the complete flow
async function runTest() {
  console.log('Starting API flow test: login -> create teacher -> verify\n');
  
  const admin = await adminLogin();
  const teacher = await createTeacher();
  const verifiedTeacher = await verifyTeacher();
  
  console.log('\n✅ Complete API flow test successful!');
}

runTest().catch(error => {
  console.error('Test failed with error:', error);
  process.exit(1);
}); 