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

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route for Demo Request
  app.post("/api/demo-request", (req, res) => {
    try {
      const { name, email, company, industry, message } = req.body;
      
      console.log("--- NEW DEMO REQUEST RECEIVED ---");
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log(`To: Giuseppe.Santaguida@adexec.com`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Company: ${company}`);
      console.log(`Industry: ${industry}`);
      console.log(`Message: ${message}`);
      console.log("---------------------------------");

      res.status(200).json({ 
        success: true, 
        message: "Request received and logged for Giuseppe.Santaguida@adexec.com" 
      });
    } catch (error: any) {
      console.error("API Route Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 404 Debugger for API
  app.use("/api/*", (req, res) => {
    console.warn(`404 at ${req.originalUrl} [${req.method}]`);
    res.status(404).json({ 
      success: false, 
      message: `API Route ${req.originalUrl} not found`,
      availableRoutes: ["/api/health", "/api/demo-request"]
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
