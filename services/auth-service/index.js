const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
    res.json({ token });
});

app.get("/health", (req, res) => {
    res.send("Auth service running");
});

app.listen(3001, () => console.log("Auth service running on port 3001"));