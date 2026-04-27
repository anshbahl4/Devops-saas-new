const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const sqs = new AWS.SQS();

const receiveMessages = async () => {
    const params = {
        QueueUrl: process.env.SQS_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (data.Messages) {
            for (const msg of data.Messages) {
                const body = JSON.parse(msg.Body);

                console.log("📩 Processing order:", body);

                // delete after processing
                await sqs.deleteMessage({
                    QueueUrl: process.env.SQS_URL,
                    ReceiptHandle: msg.ReceiptHandle
                }).promise();
            }
        } else {
            console.log("📥 No messages...");
        }

    } catch (err) {
        console.error("❌ Error:", err);
    }
};

setInterval(receiveMessages, 5000);