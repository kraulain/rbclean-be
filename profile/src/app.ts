import express from "express";
import cors from "cors";
import { PORT } from "./utils/constants";
import { profileRouter } from "./routes/index-profile";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profiles", profileRouter);

app.get('/health', function (req, res, next) {
  res.status(200).json({ message: "Profile-service up and running", "timestamp": Date.toString() });
});

app.listen(PORT, () => {
  console.log(`\nListening on http://localhost:${PORT}\n`)
});
