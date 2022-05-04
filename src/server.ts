import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Server is on!");
});

app.listen(3333, () => {
  console.log("HTTP server running!");
});
