const express = require("express");

const app = express();

const users = [
    { id: 1, name: "Ansh" },
    { id: 2, name: "Simran" }
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/health", (req, res) => {
    res.send("User service running");
});

app.listen(3002, () => console.log("User service running on port 3002"));