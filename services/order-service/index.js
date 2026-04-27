const express = require("express");
const AWS = require("aws-sdk");

const app = express();
app.use(express.json());

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const sqs = new AWS.SQS();

app.post("/order", async (req, res) => {
    const order = {
        id: Date.now(),
        item: req.body.item
    };

    const params = {
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(order)
    };

    try {
        await sqs.sendMessage(params).promise();
        console.log("📤 Sent to SQS:", order);

        res.json({ message: "Order placed", order });
    } catch (err) {
        console.error("❌ SQS Error:", err);
        res.status(500).send("Error sending message");
    }
});

app.listen(3003, () => console.log("Order service running on port 3003"));