import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log(">>> [SERVER] INITIALIZING SOVEREIGN AI BACKEND...");
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  
  // Request Logger
  app.use((req, res, next) => {
    console.log(`>>> [REQUEST] ${req.method} ${req.url}`);
    next();
  });

  // --- API ROUTES ---
  
  app.get("/ping", (req, res) => {
    console.log(">>> [API] PING RECEIVED");
    res.status(200).json({ status: "ok", service: "Sovereign AI" });
  });

  app.post("/submit-demo", (req, res) => {
    const { name, email, company } = req.body;
    console.log(`>>> [API] DEMO REQUEST: ${name} (${email}) at ${company}`);
    res.status(200).json({ success: true, message: "Logged" });
  });

  // --- FRONTEND ---

  if (process.env.NODE_ENV === "production") {
    console.log(">>> [SERVER] RUNNING IN PRODUCTION MODE");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log(">>> [SERVER] RUNNING IN DEVELOPMENT MODE (VITE)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [READY] Sovereign AI Server listening on 0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error(">>> [FATAL] Server failed to start:", err);
});
