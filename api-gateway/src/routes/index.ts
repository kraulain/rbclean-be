import express from "express";
import profileRouter from "./profiles";
import authRouter from "./auth";
import ordersRouter from "./orders";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/profiles", profileRouter);

router.use("/orders", ordersRouter);

export default router;
