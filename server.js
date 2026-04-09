import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- API ROUTES ---

app.get("/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/submit-demo", (req, res) => {
  const { name, email, company } = req.body;
  console.log(`>>> [DEMO] Request from ${name} (${email}) @ ${company}`);
  res.json({ success: true, message: "Logged for Giuseppe.Santaguida@adexec.com" });
});

// --- STATIC FILES ---

const distPath = path.join(process.cwd(), "dist");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA Fallback - ONLY for GET requests that are not API calls
  app.get("*", (req, res) => {
    if (req.url.startsWith("/api") || req.url === "/submit-demo" || req.url === "/ping") {
      return res.status(404).json({ error: "API Route Not Found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.status(500).send("Build the app first with 'npm run build'");
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
