// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require("../models");
const User = db.User;

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password harus diisi" });
    }

    // cek username sudah ada atau belum
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username sudah terdaftar" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password harus diisi" });
    }

    // cek user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password salah" });
    }

    // update last login
    user.last_login = new Date();
    await user.save();

    // buat token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login berhasil",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
