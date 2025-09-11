// Test script for contact API
const fetch = require('node-fetch');

const testContactAPI = async () => {
  const baseURL = 'http://localhost:3001';
  
  try {
    console.log('🧪 Testing Contact API...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test contact form submission
    console.log('\n2. Testing contact form submission...');
    const contactData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      organization: 'Test Organization',
      subject: 'Test Subject',
      message: 'This is a test message from the API test script.'
    };
    
    const contactResponse = await fetch(`${baseURL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    const contactResult = await contactResponse.json();
    
    if (contactResponse.ok) {
      console.log('✅ Contact form submitted successfully:', contactResult.message);
      console.log('📧 Contact ID:', contactResult.contactId);
    } else {
      console.log('❌ Contact form failed:', contactResult.message);
    }
    
    // Test validation
    console.log('\n3. Testing validation...');
    const invalidData = {
      firstName: '',
      lastName: 'Doe',
      email: 'invalid-email',
      subject: 'Test',
      message: 'Test message'
    };
    
    const validationResponse = await fetch(`${baseURL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData)
    });
    
    const validationResult = await validationResponse.json();
    
    if (!validationResponse.ok) {
      console.log('✅ Validation working correctly:', validationResult.message);
    } else {
      console.log('❌ Validation failed - should have rejected invalid data');
    }
    
    console.log('\n🎉 Contact API tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testContactAPI();
