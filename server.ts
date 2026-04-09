import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Demo Request
  app.post("/api/demo-request", (req, res) => {
    const { name, email, company, industry, message } = req.body;
    
    console.log("--- NEW DEMO REQUEST ---");
    console.log(`To: Giuseppe.Santaguida@adexec.com`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Company: ${company}`);
    console.log(`Industry: ${industry}`);
    console.log(`Message: ${message}`);
    console.log("-------------------------");

    // In a real production app, you would use a service like Resend, SendGrid, or Nodemailer here.
    // Example (pseudo-code):
    // await emailService.send({
    //   to: "Giuseppe.Santaguida@adexec.com",
    //   subject: `New Demo Request from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nIndustry: ${industry}\nMessage: ${message}`
    // });

    res.status(200).json({ success: true, message: "Request received" });
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
