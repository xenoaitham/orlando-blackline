const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'upload.wikimedia.org',
  port: 443,
  path: '/wikipedia/commons/c/ca/Brightline_Logo.svg',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download: ${res.statusCode}`);
  }
  const file = fs.createWriteStream('public/images/brightline-logo.svg');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download completed.');
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
