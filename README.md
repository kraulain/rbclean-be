# Backend repository for the RB-clean project

RB Clean is a simple laundry pickup service service

## How to setup

- https://expressjs.com/en/starter/generator.html

- Copy `.env.example` (if existing) and create `.env` at root of your service

### Kafka message format

```js
  {
    "action": "CREATE" | "READ" | "UPDATE" | "DELETE",
    "body": "<incoming_data>",
    "type": "REQUEST" | "RESPONSE",
    "token": "", // optional
    "message": "" // optional
  }
```
