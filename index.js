const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// test DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB Connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
