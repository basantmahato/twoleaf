const BASE_URL = 'http://localhost:5000/api/v1';
const credentials = {
  email: 'admin@twoleafservices.com',
  password: 'Admin@1234'
};

async function testBackend() {
  console.log('🚀 Starting Backend Functionality Test (Native Fetch)...\n');

  try {
    // 1. Health Check
    console.log('1. Testing Health Check...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const health = await healthRes.json();
    console.log('✅ Health Check Passed:', health.status);

    // 2. Login
    console.log('\n2. Testing Admin Login...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const login = await loginRes.json();
    
    if (!login.success) throw new Error(login.message || 'Login failed');
    
    const token = login.accessToken;
    console.log('✅ Login Successful. Token received.');

    const headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // 3. Get Leads
    console.log('\n3. Testing Get Leads...');
    const leadsRes = await fetch(`${BASE_URL}/leads`, { headers });
    const leads = await leadsRes.json();
    console.log(`✅ Get Leads Passed: Found ${leads.leads?.length || 0} leads.`);

    // 4. Get Projects
    console.log('\n4. Testing Get Projects...');
    const projectsRes = await fetch(`${BASE_URL}/projects`, { headers });
    const projects = await projectsRes.json();
    console.log(`✅ Get Projects Passed: Found ${projects.data?.length || 0} projects.`);

    // 5. Get Lead Stats
    console.log('\n5. Testing Dashboard Stats...');
    const statsRes = await fetch(`${BASE_URL}/leads/stats`, { headers });
    const stats = await statsRes.json();
    console.log('✅ Stats API Passed:', JSON.stringify(stats.stats));

    console.log('\n✨ ALL CORE BACKEND FUNCTIONALITIES ARE OPERATIONAL!');
  } catch (error) {
    console.error('\n❌ Test Failed!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testBackend();
