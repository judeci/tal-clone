const fs = require("fs");
const { JSDOM } = require("jsdom");

// Read the HTML file
const html = fs.readFileSync("talabat.html", "utf8");

// Load into JSDOMp
const dom = new JSDOM(html);
const document2 = dom.window.document;

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
// const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// === MYSQL CONNECTION (One persistent connection)
const db = mysql.createConnection({
  host: "127.0.0.1",
  // host: "localhost",
  user: "root",
  password: "595995!!Jayx",
  database: "talabatCl",
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// === MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    // Load latest JSON data
    const users = JSON.parse(fs.readFileSync("Users_export.json", "utf-8"));

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.log("❌ Wrong email/password!");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    console.log("✅ Correct email/password!");

    // Optional: store in database too
    const sql = "INSERT IGNORE INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ message: "Database error." });
      }

      // ✅ Only one response
      return res.json({ message: "Login successful!" });
    });
  } catch (err) {
    console.error("❌ Error reading JSON:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

//////
// === AUTO EXPORT TO JSON (no need to reopen connection)

let lastChangeId = 0;

function exportTableToJson() {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) throw err;

    // Load the latest JSON (no need to restart app)
    const users = JSON.parse(fs.readFileSync("Users_export.json", "utf-8"));

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "talabat.html"));
    });

    const sql = "INSERT IGNORE INTO users (email, password) VALUES (?, ?)";

    fs.writeFileSync("Users_export.json", JSON.stringify(results, null, 2));
    console.log("✅ Exported to JSON at", new Date().toISOString());
  });
}

function checkForChanges() {
  db.query("SELECT MAX(id) AS maxId FROM data_changes", (err, results) => {
    if (err) throw err;

    const maxId = results[0].maxId || 0;
    if (maxId > lastChangeId) {
      lastChangeId = maxId;
      exportTableToJson();
    }
  });
}

createAccForm = document2.querySelector(".create-acc-form");
createAccHdr = document2.querySelector(".hdr2");
createAccMsg = document2.querySelector(".msg2");

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error inserting:", err);
      // return res.status(500).send("DB error");
    }
    // res.send("User registered!");
  });
});

////////
// Start polling for DB changes every 5 seconds
setInterval(checkForChanges, 5000);

// === START SERVER
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
