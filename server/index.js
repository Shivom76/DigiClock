require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const sessionRoutes = require("./routes/sessionRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB (config/db.js)
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Backend API Module routes
app.use("/api/sessions", sessionRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
