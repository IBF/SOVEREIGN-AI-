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

  // 1. API ROUTES (Must be defined before Vite/Static middleware)
  
  // Test Ping
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  // Main Demo Submission
  app.post("/api/submit-demo", (req, res) => {
    const { name, email, company, industry, message } = req.body;
    
    console.log(">>> [SERVER] NEW DEMO REQUEST RECEIVED");
    console.log(`>>> To: Giuseppe.Santaguida@adexec.com`);
    console.log(`>>> From: ${name} (${email})`);
    console.log(`>>> Company: ${company} | Industry: ${industry}`);
    console.log(`>>> Message: ${message}`);
    
    return res.status(200).json({ 
      success: true, 
      message: "Request successfully logged for Giuseppe.Santaguida@adexec.com" 
    });
  });

  // 2. VITE / STATIC MIDDLEWARE
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
