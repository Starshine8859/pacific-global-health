// test-server-startup.js - Test if server.js can be loaded without errors
console.log('🔍 Testing server.js startup...\n');

try {
    // Try to require the server file
    require('./server.js');
    console.log('✅ Server.js loaded successfully!');
    console.log('📊 All imports and basic setup completed');
    console.log('🔗 MongoDB connection should be attempted');
    
    // Give it a moment to attempt connection
    setTimeout(() => {
        console.log('\n🎉 Server startup test completed!');
        console.log('💡 If you see MongoDB connection messages above, the server is working');
        process.exit(0);
    }, 2000);
    
} catch (error) {
    console.error('❌ Server startup failed:', error.message);
    console.error('📝 Error details:', error);
    process.exit(1);
}

