// Test script for training applications API
const fetch = require('node-fetch');

const testTrainingAPI = async () => {
  const baseURL = 'http://localhost:3001';
  
  try {
    console.log('🧪 Testing Training Applications API...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test training application submission
    console.log('\n2. Testing training application submission...');
    const applicationData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-123-4567',
      program: 'internship',
      inquiry: 'I am a medical student interested in gaining hands-on experience in healthcare settings across the Asia-Pacific region. I have completed my third year of medical school and am particularly interested in primary care and community health initiatives.'
    };
    
    const applicationResponse = await fetch(`${baseURL}/api/trainings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData)
    });
    
    const applicationResult = await applicationResponse.json();
    
    if (applicationResponse.ok) {
      console.log('✅ Training application submitted successfully:', applicationResult.message);
      console.log('📧 Application ID:', applicationResult.applicationId);
    } else {
      console.log('❌ Training application failed:', applicationResult.message);
    }
    
    // Test validation with missing fields
    console.log('\n3. Testing validation...');
    const invalidData = {
      name: '',
      email: 'invalid-email',
      phone: '123',
      program: 'invalid-program',
      inquiry: 'Test inquiry'
    };
    
    const validationResponse = await fetch(`${baseURL}/api/trainings`, {
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
    
    // Test different program types
    console.log('\n4. Testing different program types...');
    const programs = ['elective', 'training', 'scholarship'];
    
    for (const program of programs) {
      const testData = {
        name: `Test User ${program}`,
        email: `test.${program}@example.com`,
        phone: '+1-555-000-0000',
        program: program,
        inquiry: `Test application for ${program} program.`
      };
      
      const response = await fetch(`${baseURL}/api/trainings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      if (response.ok) {
        console.log(`✅ ${program} application submitted successfully`);
      } else {
        console.log(`❌ ${program} application failed`);
      }
    }
    
    console.log('\n🎉 Training Applications API tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testTrainingAPI();
