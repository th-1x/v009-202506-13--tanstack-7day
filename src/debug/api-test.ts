// Debug script to test JSONPlaceholder API response
async function testAPI() {
  try {
    console.log('🧪 Testing JSONPlaceholder API...');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    
    console.log('📦 Raw API Response:');
    console.log('Total users:', data.length);
    console.log('First user structure:', JSON.stringify(data[0], null, 2));
    
    // Check if all required fields exist
    const firstUser = data[0];
    console.log('\n🔍 Field Analysis:');
    console.log('- id:', typeof firstUser.id, firstUser.id);
    console.log('- name:', typeof firstUser.name, firstUser.name);
    console.log('- username:', typeof firstUser.username, firstUser.username);
    console.log('- email:', typeof firstUser.email, firstUser.email);
    console.log('- address:', typeof firstUser.address, firstUser.address ? 'exists' : 'missing');
    console.log('- phone:', typeof firstUser.phone, firstUser.phone);
    console.log('- website:', typeof firstUser.website, firstUser.website);
    console.log('- company:', typeof firstUser.company, firstUser.company ? 'exists' : 'missing');
    
    if (firstUser.address) {
      console.log('\n📍 Address structure:');
      console.log('- street:', firstUser.address.street);
      console.log('- suite:', firstUser.address.suite);
      console.log('- city:', firstUser.address.city);
      console.log('- zipcode:', firstUser.address.zipcode);
      console.log('- geo:', firstUser.address.geo);
    }
    
  } catch (error) {
    console.error('❌ API Test failed:', error);
  }
}

// Run the test
testAPI();
