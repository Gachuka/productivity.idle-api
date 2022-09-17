require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 7373;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});