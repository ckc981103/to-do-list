import express from "express";
import cors from "cors";
import { list, createOne, updateOne, deleteOne } from "./src/handlers/duty";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3030;

app.get("/", (req, res) => {
  res.send("Health Check");
});

app.get("/duties", list);
app.post("/duties", createOne);
app.put("/duties/:id", updateOne);
app.delete("/duties/:id", deleteOne);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
