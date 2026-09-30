const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve all static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Fallback to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("");
  console.log("  💕 ¡Página de cumpleaños lista! 💕");
  console.log(`  🎂 Abre en tu navegador: http://localhost:${PORT}`);
  console.log("");
  console.log("  Presiona Ctrl+C para detener el servidor");
  console.log("");
});
