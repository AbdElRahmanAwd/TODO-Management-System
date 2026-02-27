import express from "express";
import todoRouter from "./routes/todo.route";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hello, World!");
});

app.use("/todos", todoRouter);
