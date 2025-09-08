// Test script to verify login functionality
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001/api';

async function testRegistration() {
  console.log('🧪 Testing user registration...');
  
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful:', data.message);
      return data.token;
    } else {
      console.log('❌ Registration failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
    return null;
  }
}

async function testLogin() {
  console.log('🧪 Testing user login...');
  
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful:', data.message);
      return data.token;
    } else {
      console.log('❌ Login failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return null;
  }
}

async function testProfile(token) {
  console.log('🧪 Testing profile access...');
  
  try {
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Profile access successful:', data.user);
      return true;
    } else {
      console.log('❌ Profile access failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Profile access error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting login system tests...\n');
  
  // Test registration
  const regToken = await testRegistration();
  console.log('');
  
  // Test login
  const loginToken = await testLogin();
  console.log('');
  
  // Test profile access
  if (loginToken) {
    await testProfile(loginToken);
  }
  
  console.log('\n🏁 Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testRegistration, testLogin, testProfile };

