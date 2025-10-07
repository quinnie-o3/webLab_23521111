const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, images, CSS...)
app.use(express.static(path.join(__dirname)));

// Example REST API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Render REST API!" });
});

// Fallback route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
