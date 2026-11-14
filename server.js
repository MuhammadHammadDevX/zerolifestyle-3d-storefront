/**
 * Zero Lifestyle - High-Performance Local Development & Preview Server
 * Native Node.js HTTP server with range request support for 3D GLB models and MP4 videos.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  // Parse URL & strip query string
  let reqUrl = req.url.split('?')[0];

  // Decode URI components
  try {
    reqUrl = decodeURIComponent(reqUrl);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad Request');
  }

  // Handle root route
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  let filePath = path.join(ROOT_DIR, reqUrl);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  // If path is a directory, look for index.html / index.htm
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    } else if (fs.existsSync(path.join(filePath, 'index.htm'))) {
      filePath = path.join(filePath, 'index.htm');
    }
  }

  // Handle files without extensions like 'css2'
  let ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';
  if (path.basename(filePath).toLowerCase() === 'css2') {
    contentType = 'text/css; charset=utf-8';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try fallback with .html or .htm if requested without extension
      const fallbackHtml = filePath + '.html';
      const fallbackHtm = filePath + '.htm';
      if (fs.existsSync(fallbackHtml)) {
        filePath = fallbackHtml;
        contentType = 'text/html; charset=utf-8';
      } else if (fs.existsSync(fallbackHtm)) {
        filePath = fallbackHtm;
        contentType = 'text/html; charset=utf-8';
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
          <!DOCTYPE html>
          <html>
            <head><title>404 Not Found - Zero Lifestyle</title></head>
            <body style="font-family:sans-serif;text-align:center;padding:50px;background:#050505;color:#fff;">
              <h1 style="color:#00ff88;">404 - Resource Not Found</h1>
              <p>The requested file <code>${req.url}</code> was not found on this server.</p>
              <a href="/" style="color:#00d2ff;text-decoration:none;">&larr; Back to Home</a>
            </body>
          </html>
        `);
      }
    }

    const range = req.headers.range;
    const fileSize = fs.statSync(filePath).size;

    // Support HTTP Range requests for video streaming and large 3D models
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Zero Lifestyle Storefront Server is LIVE!`);
    console.log(`📡 Local URL:    http://localhost:${portToTry}`);
    console.log(`🎧 3D Product:   http://localhost:${portToTry}/products/display-earbuds.html`);
    console.log(`⌚ Smartwatches: http://localhost:${portToTry}/pages/smart-watches.html`);
    console.log(`🛍️  Cart:         http://localhost:${portToTry}/cart.html`);
    console.log(`======================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} is currently occupied. Attempting port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

if (require.main === module) {
  startServer(Number(PORT));
}

module.exports = server;
