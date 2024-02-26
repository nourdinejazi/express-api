const express = require("express");

const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log("server running");
});

app.get("/", (req, res) => {
  res.status(200).send("Root of CS Framework Express API!");
});

app.get("/:name", (req, res) => {
  const name = req.params.name;
  res.status(200).send(`The name parameter is ${name}`);
});
