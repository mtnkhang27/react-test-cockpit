const fs = require('fs');
const path = require('path');

// Chú ý: path.join('.', 'build', 'manifest.json') an toàn hơn __dirname/build
const manifestPath = path.join(__dirname, 'build', 'manifest.json');
console.log('run add-sap-app')
try {
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Lỗi: manifest.json không tìm thấy tại ${manifestPath}`);
    process.exit(1);
  }

  console.log('Script đang chạy tại:', __dirname);
console.log('Đường dẫn manifest:', manifestPath);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Kiểm tra nếu manifest.json đã có sap.app thì không thêm nữa (Tùy chọn)
  // Thêm sap.app nếu chưa có
  if (!manifest['sap.app']) {
    manifest['sap.app'] = {
      id: 'cnmaguestportal',
      applicationVersion: { version: '1.0.2' },
      type: 'application',

    };
    console.log('✅ Đã thêm sap.app');
  } else {
    console.log('ℹ️ sap.app đã tồn tại, không cần thêm.');
  }

  // 🔥 Thêm sap.cloud để public app
  if (!manifest['sap.cloud']) {
    manifest['sap.cloud'] = {
      public: true,
      service: 'my-html5-host' // <-- tên service html5-host trong mta.yaml
    };
    console.log('✅ Đã thêm sap.cloud');
  } else {
    console.log('ℹ️ sap.cloud đã tồn tại, không cần thêm.');
  }

    if (!manifest['sap.ui']) {
    manifest['sap.ui'] = {
      technology: 'HTML5'
    };
    console.log('✅ Đã thêm sap.ui');
  } else {
    console.log('ℹ️ sap.ui đã tồn tại, không cần thêm.');
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✅ Đã cập nhật manifest.json thành công!');

} catch (e) {
  console.error(`❌ Lỗi khi xử lý manifest.json: ${e.message}`);
  process.exit(1);
}

const componentJsPath = path.join(__dirname, 'build', 'Component.js');

// Nếu chưa có thì tạo mới
if (!fs.existsSync(componentJsPath)) {
  const componentJsContent = `
sap.ui.define([], function() {
  "use strict";

  return {
    // Đây là UI5 Component stub tối thiểu để HTML5 Runtime nhận app
    getMetadata: function() {
      return {
        "_version": "1.32.0",
        "sap.app": {
          "id": "cnmaguestportal",
          "type": "application",
          "applicationVersion": {
            "version": "1.0.2"
          }
        }
      };
    }
  };
});
`;

  fs.writeFileSync(componentJsPath, componentJsContent, "utf8");
  console.log("✅ Đã tạo file Component.js");
} else {
  console.log("ℹ️ Component.js đã tồn tại, bỏ qua.");
}