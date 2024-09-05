import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get('/health', function (req, res, next) {
  res.status(200).json({ message: 'Gateway up and running', timestamp: new Date().toString() });
});

app.listen(PORT, () => {
  console.log(`\nListening on http://localhost:${PORT}\n`)
});
