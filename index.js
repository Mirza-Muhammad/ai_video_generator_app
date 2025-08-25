import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Special route for iOS Universal Links
app.get("/.well-known/apple-app-site-association", (req, res) => {
  res.setHeader("Content-Type", "application/json"); // iOS requires this
  res.sendFile(path.join(__dirname, ".well-known", "apple-app-site-association"));
});

// ✅ Static serving for other .well-known files
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Example: keep API root JSON (optional)
// app.get("/", (req, res) => {
//   res.json({ message: "server route hit!" });
// });

// ✅ Fallback: for every other route → launch.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "launch.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
