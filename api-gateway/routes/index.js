import express from "express"
import { Kafka } from "kafkajs";
var router = express.Router();

const kafka = new Kafka({
  clientId: 'api-gateway',
  brokers: ['kafka:9092'],
})

const producer = kafka.producer()
await producer.connect()

/* 
GET home page. 
*/
router.get('/health', function(req, res, next) {
  res.status(200);
  res.json({ "message": 'Up',  "timestamp" : Date.now()});
});

router.post('/profiles', async function(req, res, next) {
  var profile = req.body;

  await producer.send({
    topic: 'create-profile',
    messages: [
      { value: profile },
    ],
  })
  await producer.disconnect()
  //todo fetch response
});


export default router;
