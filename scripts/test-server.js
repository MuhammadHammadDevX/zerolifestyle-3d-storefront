const http = require('http');
const server = require('../server.js');

const PORT = 3456;

async function checkUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${PORT}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'] || data.length,
          preview: data.slice(0, 100).replace(/\s+/g, ' ')
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

server.listen(PORT, async () => {
  console.log(`Test server started on port ${PORT}...`);

  const testEndpoints = [
    '/',
    '/index.html',
    '/cart.html',
    '/search.html',
    '/products/display-earbuds.html',
    '/pages/smart-watches.html',
    '/collections/platinum-series-products.html',
    '/3d/models/7996311cf3ce7e1e/Display_GLB.glb',
    '/css2?family=Bricolage+Grotesque',
    '/cdn/shop/t/55/assets/theme.min.css'
  ];

  let allPassed = true;
  for (const endpoint of testEndpoints) {
    const res = await checkUrl(endpoint);
    if (res.statusCode === 200 || res.statusCode === 206) {
      console.log(`[PASS] ${endpoint} -> ${res.statusCode} (${res.contentType}, ${res.contentLength} bytes)`);
    } else {
      console.error(`[FAIL] ${endpoint} -> ${res.statusCode || res.error}`);
      allPassed = false;
    }
  }

  server.close(() => {
    console.log('\nTest server shut down cleanly.');
    if (allPassed) {
      console.log('✅ ALL SERVER VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
      process.exit(0);
    } else {
      console.error('❌ SOME CHECKS FAILED!\n');
      process.exit(1);
    }
  });
});
