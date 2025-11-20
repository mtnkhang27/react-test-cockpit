const fs = require('fs');
const path = require('path');

console.log('▶️ run add-sap-app.js');

// Đường dẫn manifest sau build
const manifestPath = path.join(__dirname, 'build', 'manifest.json');

try {
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Lỗi: manifest.json không tìm thấy tại ${manifestPath}`);
    process.exit(1);
  }

  console.log('📁 Script đang chạy tại:', __dirname);
  console.log('📄 Đường dẫn manifest:', manifestPath);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // ------------------------
  // Add sap.app
  // ------------------------
  if (!manifest['sap.app']) {
    manifest['sap.app'] = {
      id: 'cnmaguestportal',
      applicationVersion: { version: '1.0.2' },
      type: 'application'
    };
    console.log('✅ Đã thêm sap.app');
  } else {
    console.log('ℹ️ sap.app đã tồn tại, bỏ qua.');
  }

  // ------------------------
  // Add sap.cloud
  // ------------------------
  if (!manifest['sap.cloud']) {
    manifest['sap.cloud'] = {
      public: true,
      service: 'cnmaguest'
    };
    console.log('✅ Đã thêm sap.cloud');
  } else {
    console.log('ℹ️ sap.cloud đã tồn tại, bỏ qua.');
  }

  // ------------------------
  // Add sap.ui
  // ------------------------
  if (!manifest['sap.ui']) {
    manifest['sap.ui'] = { technology: 'HTML5' };
    console.log('✅ Đã thêm sap.ui');
  } else {
    console.log('ℹ️ sap.ui đã tồn tại, bỏ qua.');
  }

  // ------------------------
  // Add sap.flp
  // ------------------------
  // if (!manifest['sap.flp']) {
  //   manifest['sap.flp'] = {
  //     type: "html5",
  //     config: { title: "Guest Portal" }
  //   };
  //   console.log('✅ Đã thêm sap.flp');
  // } else {
  //   console.log('ℹ️ sap.flp đã tồn tại, bỏ qua.');
  // }

  // Save manifest.json
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('💾 Đã ghi manifest.json thành công!');

} catch (e) {
  console.error(`❌ Lỗi khi xử lý manifest.json: ${e.message}`);
  process.exit(1);
}

// --------------------------------------------------
//  Tạo Component.js (nếu chưa có)
// --------------------------------------------------
// const componentJsPath = path.join(__dirname, 'build', 'Component.js');

// if (!fs.existsSync(componentJsPath)) {
//   const content = `
// sap.ui.define([], function() {
//   "use strict";

//   return {
//     getMetadata: function() {
//       return {
//         "_version": "1.2.0",
//   "sap.app": {
//     "id": "cnmaguestportal",
//     "type": "application",
//     "i18n": "i18n/i18n.properties",
//     "title": "{{appTitle}}",
//     "description": "{{appDescription}}",
//     "applicationVersion": {
//       "version": "1.0.0"
//     },
//     "sourceTemplate": {
//       "id": "servicecatalog.connectivityComponentForManifest",
//       "version": "0.0.0"
//     },
//     "crossNavigation": {
//       "inbounds": {
//         "cnma-react-inbound": {
//           "signature": {
//             "parameters": {},
//             "additionalParameters": "allowed"
//           },
//           "semanticObject": "react",
//           "action": "new"
//         }
//       }
//     }
//   },
//   "sap.ui": {
//     "fullWidth": true,
//     "technology": "UI5",
//     "icons": {
//       "icon": "sap-icon://task",
//       "favIcon": "",
//       "phone": "",
//       "phone@2": "",
//       "tablet": "",
//       "tablet@2": ""
//     },
//     "deviceTypes": {
//       "desktop": true,
//       "tablet": true,
//       "phone": true
//     }
//   },
//   "sap.cloud": {
//     "public": true,
//     "service": "cnma_guest_html5_host"
//   },
//   "sap.flp": {
//     "type": "app",
//     "config": {
//       "title": "Guest Portal"
//     }
//   }
//       };
//     }
//   };
// });
// `;
//   fs.writeFileSync(componentJsPath, content, "utf8");
//   console.log("📦 Đã tạo file Component.js");
// } else {
//   console.log("ℹ️ Component.js đã tồn tại, bỏ qua.");
// }
