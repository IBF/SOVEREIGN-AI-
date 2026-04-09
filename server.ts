import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS for all origins in this environment
  app.use(cors());
  app.use(express.json());

  // --- API ROUTES ---
  
  // Health check / Ping
  app.get("/api/health", (req, res) => {
    console.log(">>> [API] Health check requested");
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Main Demo Submission
  app.post("/api/submit-demo", (req, res) => {
    try {
      const { name, email, company, industry, message } = req.body;
      
      console.log(">>> [API] NEW DEMO REQUEST RECEIVED");
      console.log(`>>> To: Giuseppe.Santaguida@adexec.com`);
      console.log(`>>> From: ${name} (${email})`);
      console.log(`>>> Company: ${company} | Industry: ${industry}`);
      console.log(`>>> Message: ${message}`);
      
      res.status(200).json({ 
        success: true, 
        message: "Request successfully logged for Giuseppe.Santaguida@adexec.com" 
      });
    } catch (err: any) {
      console.error(">>> [API] Error processing request:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  // Catch-all for other /api routes
  app.all("/api/*", (req, res) => {
    console.warn(`>>> [API] 404 on ${req.method} ${req.url}`);
    res.status(404).json({ 
      error: "API Route Not Found",
      path: req.url,
      method: req.method
    });
  });

  // --- FRONTEND SERVING ---

  if (process.env.NODE_ENV !== "production") {
    console.log(">>> [SERVER] Starting in DEVELOPMENT mode (Vite Middleware)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [SERVER] Starting in PRODUCTION mode (Static Files)");
    const distPath = path.join(process.cwd(), "dist");
    
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.error(">>> [SERVER] ERROR: 'dist' folder not found. Frontend will not be served.");
      app.get("*", (req, res) => {
        res.status(500).send("Production build missing. Please run 'npm run build'.");
      });
    }
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [SERVER] Sovereign AI Backend listening on port ${PORT}`);
    console.log(`>>> [SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (err: any) => {
    console.error(">>> [SERVER] Critical error:", err);
  });
}

process.on('uncaughtException', (err) => {
  console.error(">>> [PROCESS] Uncaught Exception:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(">>> [PROCESS] Unhandled Rejection at:", promise, "reason:", reason);
});

startServer().catch(err => {
  console.error(">>> [SERVER] Failed to start server:", err);
});
