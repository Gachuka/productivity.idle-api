require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 7373;

app.use(express.json());
app.use(cors());

function readTextTyped() {
  const textTypedFile = fs.readFileSync("./data/text_typed.json");
  const textTypedData = JSON.parse(textTypedFile);
  return textTypedData;
}

app.get('/', (req, res) => {
  const textTyped = readTextTyped()
  console.log('GET Request')
  res.json(textTyped.text_typed);
});

app.put('/', (req, res) => {
  const textData = readTextTyped()
  const reqBody = req.body.text_typed
  const newTextData = {
    text_typed: (textData.text_typed+req.body.text_typed).slice(-110)
  }
  console.log('Game Saved')

  fs.writeFileSync("./data/text_typed.json", JSON.stringify(newTextData))
  res.status(200).json(reqBody)
})

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});