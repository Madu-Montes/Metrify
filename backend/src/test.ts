import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req.userId); // se NÃO der erro, vitória
  res.send("ok");
});

export {};
