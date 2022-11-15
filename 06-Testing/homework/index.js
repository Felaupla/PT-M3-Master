const express = require("express");
const { pluck } = require("./utils");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.status(200).send({ message: "hola" });
});

app.get("/test", (req, res) => {
  res.status(200).send({ message: "hola" });
});

app.post("/sum", (req, res) => {
  res.status(200).send({
    result: req.body.a + req.body.b,
  });
});

app.post("/product", (req, res) => {
  res.status(200).send({
    result: req.body.a * req.body.b,
  });
});
const sumArray = (arr, n) => {
  if (!Array.isArray(arr) || typeof n !== "number") throw new TypeError("arr");
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === n) return true;
    }
  }
  return false;
};
app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  res.send({ result: sumArray(array, num) });
});

app.post("/numString", (req, res) => {
  const string = req.body.string;
  if (typeof string !== string || string === "") return res.sendStatus(400);
  return res.json({ result: string.length });
});
app.post("/pluck", (req, res) => {
  let { array, prop } = req.body;
  if (!Array.isArray(array) || prop === "") return res.sendStatus(400);
  return res.send({ result: pluck(array, prop) });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
