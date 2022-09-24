require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");
const knex = require('knex')(require('./knexfile'));

const PORT = process.env.PORT || 7373;

app.use(express.json());
app.use(cors());

// READ LOCAL JSON FILE
// function readSaveFile() {
//   const saveFile = fs.readFileSync("./data/save_file.json");
//   const saveData = JSON.parse(saveFile);
//   return saveData;
// }

// FORMATING FUNCTION FOR LOCAL JSON FILE
// function mapSaveFile(saveData, data) {
//   const newData = {}
//   for (const [key, value] of Object.entries(saveData)) {
//     if (key === "text_typed" && data.text_typed) {
//       newData[key] = (saveData.text_typed + data.text_typed).slice(-110)
//     } else if (key === 'character_count' && data.character_count) {
//       newData[key] = data.character_count 
//     } else if (key === 'character_left') {
//       newData[key] = (data.character_count ? data.character_count : saveData.character_count) - ((data.upgrade_1 ? data.upgrade_1: saveData.upgrade_1) * 500) - ((data.upgrade_2 ? data.upgrade_2 : saveData.upgrade_2) * 1000) - ((data.upgrade_3 ? data.upgrade_3 : saveData.upgrade_3) * 750)
//     } else if (key === 'upgrade_1' && data.upgrade_1) {
//       newData[key] = data.upgrade_1
//     } else if (key === 'upgrade_2' && data.upgrade_2) {
//       newData[key] = data.upgrade_2
//     } else if (key === 'upgrade_3' && data.upgrade_3) {
//       newData[key] = data.upgrade_3
//     } else if (key === 'add_per_input') {
//       newData[key] = (1 + (data.upgrade_1 ? data.upgrade_1: saveData.upgrade_1)) * (2 ** (data.upgrade_2 ? data.upgrade_2 : saveData.upgrade_2) )
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
      newData[key] = (data.character_count ? data.character_count : saveData.character_count) - (Math.round((500*(1-(Math.pow(1.5,(data.upgrade_1 ? data.upgrade_1 : saveData.upgrade_1)))))/(-.5))) - ((data.upgrade_2 ? data.upgrade_2 : saveData.upgrade_2) * 1000) - ((data.upgrade_3 ? data.upgrade_3 : saveData.upgrade_3) * 750)
      console.log(saveData.character_left)
      console.log(Math.round((500*(1-(Math.pow(1.5,(data.upgrade_1 ? data.upgrade_1 : saveData.upgrade_1)))))/(-.5)))
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

// GET LOCAL JSON FILE
// app.get('/', (req, res) => {
//   const textTyped = readSaveFile()
//   console.log('GET Request')
//   res.status(200).json(textTyped);
// });

// UPDATE LOCAL JSON FILE
// app.put('/', (req, res) => {
//   const saveFileData = readSaveFile()
//   const reqBody = req.body
//   const newSaveFileData = mapSaveFile(saveFileData, reqBody)
  
//   console.log(req.body)
//   fs.writeFileSync("./data/save_file.json", JSON.stringify(newSaveFileData))
//   const readAgain = readSaveFile()
//   // console.log('Game Saved', readAgain)
//   res.status(200).json(req.body)
// })

// app.post('/', (req, res) => {
//   knex('save')
//     .insert({
//       "text_typed": "",
//       "character_count": 0,
//       "character_left": 0,
//       "upgrade_1": 0,
//       "upgrade_2": 0,
//       "upgrade_3": 0,
//       "add_per_input": 1
//     })
//     .then((data) => {
//       console.log(data)
//       res.status(201).json(req.body);
//     })
//     .catch((err) => res.status(400).send(`Error saving`));
// })

// GET DATABASE
app.get('/', (req, res) => {
  console.log('GET Request')
  knex('save')
    .where({ id: 1 })
    .select('text_typed','character_count' ,'character_left' ,'upgrade_1' ,'upgrade_2' ,'upgrade_3', 'add_per_input')
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
});

// UPDATE DATABASE
app.put('/', async (req, res) => {
  const reqBody = req.body
  console.log(req.body)
  let saveFileData = null

  await knex('save')
  .select('text_typed','character_count' ,'character_left' ,'upgrade_1' ,'upgrade_2' ,'upgrade_3', 'add_per_input' )
  .where({ id: 1})
  .then((data) => {
    saveFileData = data[0]
  })
  .catch((err) => 
    res.status(400).send(`Error retrieving save ${err}`)
  );

  // console.log(saveFileData)
  const newSaveFileData = mapSaveFile(saveFileData, reqBody)
  
  await knex('save')
  .where({ id: 1 })
  .update(newSaveFileData)
  .then(() => {
    res.status(200).send(`Game Saved`);
  })
  .catch((err) =>
    res.status(400).send(`Error Saving`)
  );
})

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});