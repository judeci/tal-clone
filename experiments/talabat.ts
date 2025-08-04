import * as fs from "fs";
import * as path from "path";
import express from "express";
import { Request, Response } from "express";
import * as mysql from "mysql2";
import * as dotenv from "dotenv";
import { JSDOM } from "jsdom";
import * as bcrypt from "bcrypt";

import { fileURLToPath } from "url";
// import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === ENV SETUP ===
dotenv.config();

// === READ HTML TEMPLATE ===
const html = fs.readFileSync("talabat.html", "utf8");
const dom = new JSDOM(html);
const document2 = dom.window.document;

// === EXPRESS APP SETUP ===
const app = express();
const port = 3000;

// === MIDDLEWARE ===
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..")));

// === MYSQL CONNECTION ===
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "talabatCl",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL!");
});

// === INTERFACES ===
interface User {
  id?: number;
  email: string;
  password: string;
}

// === ROUTES ===

// Home Page
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "talabat.html"));
});

// Login Route
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const users: User[] = JSON.parse(
      fs.readFileSync("Users_export.json", "utf-8")
    );
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("❌ Wrong email/password!");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    console.log("✅ Login success");

    const sql = "INSERT IGNORE INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, user.password], (err) => {
      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ message: "Database error." });
      }
      return res.json({ message: "Login successful!" });
    });
  } catch (err) {
    console.error("❌ Error reading JSON:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Register Route
app.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, hashedPassword], (err) => {
      if (err) {
        console.error("❌ Error inserting:", err);
        return res.status(500).json({ message: "DB error" });
      }
      return res.json({ message: "User registered!" });
    });
  } catch (err) {
    console.error("❌ Hashing error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// === DOM REFERENCES (if needed server-side)
const createAccForm = document2.querySelector(
  ".create-acc-form"
) as HTMLElement | null;
const createAccHdr = document2.querySelector(".hdr2") as HTMLElement | null;
const createAccMsg = document2.querySelector(".msg2") as HTMLElement | null;

// === JSON EXPORT + POLLING ===

let lastChangeId = 0;

function exportTableToJson(): void {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("❌ Query Error:", err);
      return;
    }
    fs.writeFileSync("Users_export.json", JSON.stringify(results, null, 2));
    console.log("✅ Exported to JSON at", new Date().toISOString());
  });
}

function checkForChanges(): void {
  db.query(
    "SELECT MAX(id) AS maxId FROM data_changes",
    (err, results: any[]) => {
      if (err) {
        console.error("❌ Polling error:", err);
        return;
      }
      const maxId = results[0]?.maxId || 0;
      if (maxId > lastChangeId) {
        lastChangeId = maxId;
        exportTableToJson();
      }
    }
  );
}

// Poll every 5 seconds
setInterval(checkForChanges, 5000);

// === START SERVER ===
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
