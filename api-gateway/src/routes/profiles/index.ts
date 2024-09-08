import { Router } from "express";
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const profileRouter = Router();

profileRouter.get("/", (_, res) => {
  res.status(200).json({
    message: "Profile endpoints",
    timeStamp: new Date().toString(),
  });
});

const kafka = new Kafka({
  clientId: "api-gateway-service",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: "profile-service.create.response-handler",
});
const pendingResponses = new Map();

async function initKafka() {
  await producer.connect();
  await consumer.connect();

  // Subscribe to the response topic
  await consumer.subscribe({
    topic: "profile-service.create.response",
    fromBeginning: false,
  });

  // Listen for responses
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const response = JSON.parse(message.value!.toString());
      const { correlationId, data } = response;

      // Resolve the promise for the matching correlation ID
      if (pendingResponses.has(correlationId)) {
        pendingResponses.get(correlationId)(data);
        pendingResponses.delete(correlationId);
      }
    },
  });
}

profileRouter.post("/", async function (req, res, next) {
  const profile = req.body;
  const correlationId = uuidv4(); // Generate a unique ID for this request

  // Send the profile data to the 'profile-service.create.request' topic with the correlation ID
  await producer.send({
    topic: "profile-service.create.request",
    messages: [{ value: JSON.stringify({ profile, correlationId }) }],
  });

  // Create a promise that will resolve when the response is received
  const responsePromise = new Promise((resolve) => {
    pendingResponses.set(correlationId, resolve);
  });

  // Wait for the response and return it as JSON
  const responseData = await responsePromise;
  res.status(200).json({ message: "Profile created", response: responseData });
});

initKafka();

export default profileRouter;
