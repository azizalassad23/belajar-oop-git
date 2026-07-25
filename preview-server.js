/* =========================================================
   preview-server.js — Server lokal untuk melihat situs
   sebelum di-deploy. OPSIONAL (situs juga bisa dibuka
   langsung dengan double-click index.html).

   Cara pakai:
     1. Pastikan Node.js terpasang.
     2. Buka terminal di folder ini.
     3. Jalankan:  node preview-server.js
     4. Buka browser ke:  http://localhost:8099
   ========================================================= */
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname;
const PORT = 8099;
const types = {
  ".html": "text/html", ".js": "application/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(root, p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("404 Not Found: " + p); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "text/plain" });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log("Situs berjalan di:  http://localhost:" + PORT);
  console.log("Tekan Ctrl+C untuk berhenti.");
});
