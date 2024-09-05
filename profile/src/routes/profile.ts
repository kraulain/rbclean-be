import Router from "express";
import { myProfile } from "../modules/my-profile/profile.controller";
import { Kafka } from "kafkajs";

const router = Router();

router.get("/profile", myProfile);

const kafka = new Kafka({
  clientId: "profile-service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({
  groupId: "profile-service.create.request-handler",
});
const producer = kafka.producer();

async function listen() {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({
    topic: "profile-service.create.request",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { profile, correlationId } = JSON.parse(message.value!.toString());

      // Process the profile data and create a response
      const responseData = { status: "success", profileId: "12345" }; // Example response data

      // Send the response to the 'profile-service.create.response' topic with the correlation ID
      await producer.send({
        topic: "profile-service.create.response",
        messages: [
          { value: JSON.stringify({ correlationId, data: responseData }) },
        ],
      });

      console.log(
        "Response sent to profile-service.create.response topic:",
        responseData
      );
    },
  });
}

listen();

export default router;
