import { config, S3, SNS, PublishCommand } from "aws-sdk";

const s3 = new S3();
const sns = new SNS();
config.update({
  accessKeyId: process.env.NOTIFICATION_ACCESS_KEY_ID,
  secretAccessKey: process.env.NOTIFICATION_SECRET_ACCESS_KEY,
});

const myBucket = process.env.S3_BUCKET;
const queue = process.env.NOTIFICATION_QUEUE;

const wsSocket = new WebSocket("wss://logger");

amqp.connect("amqp://rabbitmq", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.consume(
      queue,
      async (msg) => {
        const myKey = msg.content.toString();
        const url = await s3.getSignedUrl("putObject", {
          Bucket: myBucket,
          Key: myKey,
        });
        const response = await sns.send(
          new PublishCommand({
            Message: JSON.stringify({ message: "intruder", url}),
            TopicArn: process.env.SNS_TOPIC_ARN,
          })
        );
        wsSocket.send(JSON.stringify({ topic: 'info', message: response }));
      },
      {
        noAck: false,
      }
    );
  });
});
