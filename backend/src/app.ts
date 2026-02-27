import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.route";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";

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

app.use("/auth", authRouter);
app.use("/todos", authMiddleware, todoRouter);
