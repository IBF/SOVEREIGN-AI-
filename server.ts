import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Global Logger
  app.use((req, res, next) => {
    console.log(`>>> [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route for Demo Request - Using v1 prefix for clarity
  app.all("/api/v1/demo", (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
      const { name, email, company, industry, message } = req.body;
      
      console.log("--- NEW DEMO REQUEST RECEIVED (v1) ---");
      console.log(`To: Giuseppe.Santaguida@adexec.com`);
      console.log(`From: ${name} <${email}>`);
      console.log("--------------------------------------");

      res.status(200).json({ 
        success: true, 
        message: "Request received for Giuseppe.Santaguida@adexec.com" 
      });
    } catch (error: any) {
      console.error("API Route Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 404 Debugger for API
  app.use("/api/*", (req, res) => {
    console.warn(`!!! API 404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      success: false, 
      message: `Endpoint ${req.originalUrl} not found on this server`,
      validEndpoints: ["/api/health", "/api/v1/demo"]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
