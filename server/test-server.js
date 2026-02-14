const express = require('express');
const app = express();

// Middleware to log every single request that hits the server
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Test API 1
app.get("/api/o1", (req, res) => {
    res.json({ 
        message: "API O1 is working!",
        receivedPath: req.url 
    });
});

// Test API 2
app.get("/api/o2", (req, res) => {
    res.json({ 
        message: "API O2 is working!",
        receivedPath: req.url 
    });
});

// Fallback for everything else
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found in Test Server",
        pathAttempted: req.url
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Test server running on http://127.0.0.1:${PORT}`);
});