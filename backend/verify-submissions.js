require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('./src/models/lead.model');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const leads = await Lead.find({ 
    source: { $in: ['contact_form', 'start_project_page'] } 
  }).sort({ createdAt: -1 }).limit(5);
  
  console.log('--- LATEST SUBMISSIONS ---');
  leads.forEach(l => console.log(`${l.createdAt.toISOString()} | ${l.name} | ${l.source}`));
  console.log('---------------------------');
  process.exit(0);
}

check();
