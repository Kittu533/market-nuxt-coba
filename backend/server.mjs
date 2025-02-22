import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware.mjs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Register API
app.post("/api/register", async (req, res) => {
  console.log("Request body:", req.body); // Debugging log

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword); // Debugging log

    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "User already exists" });
      }
      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// API Profile (Hanya bisa diakses jika login)
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    // Menggunakan promise untuk query MySQL
    const [results] = await db
      .promise()
      .query("SELECT id, email FROM users WHERE id = ?", [req.user.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kirim data user tanpa password
    res.json({ message: "Welcome to your profile", user: results[0] });
  } catch (error) {
    console.error("Error in /api/profile:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
