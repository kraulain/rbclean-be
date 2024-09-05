# Backend repository for the RB-clean project

RB Clean is a simple laundry pickup service service

## How to setup

- For specification on each service, follow the __Readme__ file for that service
  - [api-gateway-readme](./api-gateway/Readme.md)
  - [auth-service-readme](./auth/Readme.md)
  - [order-service-readme](./orders/Readme.md)
  - [profile-service-readme](./profile/Readme.md)

- For each service Copy `.env.example` (if existing) and create `.env` at root of your service

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
