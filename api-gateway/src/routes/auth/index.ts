import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (_, res) => {
  res.status(200).json({
    message: "Auth endpoints",
    timeStamp: new Date().toString(),
  });
});

// break down code to sub folders and build here!!!

export default authRouter;
