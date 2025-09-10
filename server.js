// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

console.log("✅ Auth routes loaded"); // tambahkan log ini

// Sync database
db.sequelize.sync().then(() => {
  console.log("✅ Database connected");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
