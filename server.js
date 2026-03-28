const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(__dirname));

// Test API
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Financial API
app.post("/calculate", (req, res) => {
    const { income, expenses } = req.body;

    let savings = income - expenses;
    let sip = savings * 0.3;
    let emergency = expenses * 6;

    res.json({
        savings,
        sip,
        emergency
    });
});

// Start server
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});