import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.route";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.get("/health", (req, res) => {
  res.send("Hello, World!");
});

app.use("/todos", todoRouter);
