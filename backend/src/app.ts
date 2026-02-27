import express from "express";

export const app = express();

app.use(express.json());

// routes here ya wal3d
app.get("/health", (req, res) => {
  res.send("Hello, World!");
});
