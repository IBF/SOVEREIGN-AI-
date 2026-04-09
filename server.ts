import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES FIRST ---
  
  // Heartbeat for the frontend status light
  app.get("/ping", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Legacy path support
  app.get("/api/ping", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Main Demo Submission
  app.post("/submit-demo", (req, res) => {
    const { name, email, company, industry, message } = req.body;
    
    console.log(">>> [SERVER] NEW DEMO REQUEST RECEIVED");
    console.log(`>>> To: Giuseppe.Santaguida@adexec.com`);
    console.log(`>>> From: ${name} (${email})`);
    console.log(`>>> Company: ${company} | Industry: ${industry}`);
    console.log(`>>> Message: ${message}`);
    
    res.status(200).json({ 
      success: true, 
      message: "Request successfully logged for Giuseppe.Santaguida@adexec.com" 
    });
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      // Fallback to Vite if dist is missing even in production
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Sovereign AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error(">>> Failed to start server:", err);
});
