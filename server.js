require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 7373;

app.use(express.json());
app.use(cors());

function readSaveFile() {
  const saveFile = fs.readFileSync("./data/save_file.json");
  const saveData = JSON.parse(saveFile);
  return saveData;
}

// function mapSaveFile(saveData, data) {
//   const newData = {}
//   for (const [key, value] of Object.entries(saveData)) {
//     if (key === "text_typed" && data.text_typed) {
//       newData[key] = (saveData.text_typed + data.text_typed).slice(-110)
//     } else if (key === 'character_count' && data.character_count) {
//       newData[key] = data.character_count 
//     } else if (key === 'character_left') {
//       newData[key] = saveData.character_count - (saveData.upgrade_1 * 5000) - (saveData.upgrade_2 * 10000) - (saveData.upgrade_3 * 5000)
//     } else if (key === 'upgrade_1' && data.upgrade_1) {
//       newData[key] = data.upgrade_1
//     } else if (key === 'upgrade_2' && data.upgrade_2) {
//       newData[key] = data.upgrade_2
//     } else if (key === 'upgrade_3' && data.upgrade_3) {
//       newData[key] = data.upgrade_3
//     } else if (key === 'add_per_input') {
//       newData[key] = (1 + saveData.upgrade_1) * (2 ** saveData.upgrade_2 )
//     } else if (key === 'timestamp') {
//       newData[key] = Date.now()
//     } else {
//       newData[key] = value
//     }
//   }
//   return newData
// }
function mapSaveFile(saveData, data) {
  const newData = {}
  for (const [key, value] of Object.entries(saveData)) {
    if (key === "text_typed" && data.text_typed) {
      newData[key] = (saveData.text_typed + data.text_typed).slice(-110)
    } else if (key === 'character_count' && data.character_count) {
      newData[key] = data.character_count 
    } else if (key === 'character_left') {
      newData[key] = (data.character_count ? data.character_count : saveData.character_count) - ((data.upgrade_1 ? data.upgrade_1: saveData.upgrade_1) * 500) - ((data.upgrade_2 ? data.upgrade_2 : saveData.upgrade_2) * 1000) - ((data.upgrade_3 ? data.upgrade_3 : saveData.upgrade_3) * 750)
    } else if (key === 'upgrade_1' && data.upgrade_1) {
      newData[key] = data.upgrade_1
    } else if (key === 'upgrade_2' && data.upgrade_2) {
      newData[key] = data.upgrade_2
    } else if (key === 'upgrade_3' && data.upgrade_3) {
      newData[key] = data.upgrade_3
    } else if (key === 'add_per_input') {
      newData[key] = (1 + (data.upgrade_1 ? data.upgrade_1: saveData.upgrade_1)) * (2 ** (data.upgrade_2 ? data.upgrade_2 : saveData.upgrade_2) )
    } else if (key === 'timestamp') {
      newData[key] = Date.now()
    } else {
      newData[key] = value
    }
  }
  return newData
}

app.get('/', (req, res) => {
  const textTyped = readSaveFile()
  console.log('GET Request')
  res.status(200).json(textTyped);
});

app.put('/', (req, res) => {
  // const saveTime = Date.now()
  const saveFileData = readSaveFile()
  const reqBody = req.body
  const newSaveFileData = mapSaveFile(saveFileData, reqBody)
  
  fs.writeFileSync("./data/save_file.json", JSON.stringify(newSaveFileData))
  const readAgain = readSaveFile()
  console.log('Game Saved', readAgain)
  res.status(200).json(req.body)
})

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});