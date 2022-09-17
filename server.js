require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 7373;

app.use(express.json());
app.use(cors());

function readTestTyped() {
  const textTypedFile = fs.readFileSync("./data/text_typed.json");
  const textTypedData = JSON.parse(textTypedFile);
  return textTypedData;
}

app.get('/', (req, res) => {
  const textTyped = readTestTyped()
  console.log('GET Request')
  res.json(textTyped.text_typed);
});

app.put('/', (req, res) => {
  const reqBody = req.body.key
  console.log(reqBody)
  console.log('Game Saved')
  res.status(200).json(reqBody)
})

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});