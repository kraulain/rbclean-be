import { Router } from "express";

const ordersRouter = Router();

ordersRouter.get("/", (_, res) => {
  res.status(200).json({
    message: "Order endpoints",
    timeStamp: new Date().toString(),
  });
});

// break down code to sub folders and build here!!!

export default ordersRouter;
