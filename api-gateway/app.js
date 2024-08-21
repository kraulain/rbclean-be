import express from "express";
import cors from "cors";
import router  from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`\nListening on http://localhost:${PORT}\n`)
});