const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("prom-client");

const app = express();

app.use(express.json());

/* ---------------- PROMETHEUS METRICS ---------------- */

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const register = client.register;

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

/* ---------------- AUTH ROUTES ---------------- */

app.post("/login", (req, res) => {
    const { username } = req.body;

    const token = jwt.sign(
        { username },
        "secret",
        { expiresIn: "1h" }
    );

    res.json({ token });
});

app.get("/health", (req, res) => {
    res.send("Auth service running");
});

/* ---------------- START SERVER ---------------- */

app.listen(3001, () => {
    console.log("Auth service running on port 3001");
});