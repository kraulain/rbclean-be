import express from "express";
import cors from "cors";
import { PORT } from "./utils/constants.js";
import { profileRouter } from "./routes/index-profile.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", profileRouter);


app.listen(PORT, () => {
  console.log(`\nListening on http://localhost:${PORT}\n`)
});