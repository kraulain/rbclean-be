import Router from "express"
import { myProfile } from "../modules/my-profile/profile.controller.js"
import { Kafka } from "kafkajs";
import fs from "fs";

const router = Router()

router.get("/profile", myProfile)

const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['kafka:9092'],
})



async function listen(){
    const consumer = kafka.consumer({ groupId: 'profile-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'create-profile', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
           fs.writeFile("./file.txt", message.value.toString(), function(error){
            //
           });

           console.log({
            value: message.value.toString(),
          });
        },
    })
}

listen();

export default router