const fs = require('fs');
const path = './build/manifest.json';

// Đọc manifest hiện tại
const manifest = JSON.parse(fs.readFileSync(path, 'utf8'));

// Thêm hoặc merge sap.app
manifest['sap.app'] = {
  id: "cnmaguestportal",
  applicationVersion: {
    version: "1.0.2"
  }
};

// Ghi lại file
fs.writeFileSync(path, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Updated build/manifest.json with sap.app');
