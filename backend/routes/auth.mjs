import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.mjs";

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user ada di database
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Bandingkan password dengan hash di database
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
