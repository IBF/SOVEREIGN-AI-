import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

console.log(">>> [BOOT] Sovereign AI Server Initializing...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- CRITICAL API ROUTES ---
  
  // Debug Ping
  app.get("/api/ping", (req, res) => {
    console.log(">>> [API] Ping received");
    res.json({ status: "alive", time: new Date().toISOString() });
  });

  // Main Demo Submission - Root level for maximum reachability
  app.all("/submit-demo", (req, res) => {
    console.log(`>>> [API] Request to /submit-demo | Method: ${req.method} | Origin: ${req.get('origin')}`);
    
    if (req.method === "GET") {
      return res.send("Sovereign AI Submission Endpoint is Active. Use POST to submit data.");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { name, email, company, industry, message } = req.body;
      
      console.log(">>> [SUCCESS] DEMO REQUEST CAPTURED");
      console.log(`>>> To: Giuseppe.Santaguida@adexec.com`);
      console.log(`>>> From: ${name} (${email})`);
      console.log(`>>> Company: ${company}`);
      console.log("--------------------------------------");

      return res.status(200).json({ 
        success: true, 
        message: "Request successfully received for Giuseppe.Santaguida@adexec.com" 
      });
    } catch (err) {
      console.error(">>> [ERROR] Processing submission:", err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  // --- FRONTEND SERVING ---

  if (process.env.NODE_ENV !== "production") {
    console.log(">>> [MODE] Development (Vite)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [MODE] Production (Static)");
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn(">>> [WARN] 'dist' folder missing. Serving fallback.");
      app.get("*", (req, res) => res.status(500).send("Build missing."));
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [READY] Sovereign AI Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error(">>> [FATAL] Server failed to start:", err);
});
