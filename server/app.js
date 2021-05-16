const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// MIDDLEWARES 
app.use(cors());
app.use(bodyParser.json());

const biodieselCompanyNamesRoute = require("./routes/company-names.biodiesel");
const etanolCompanyNamesRoute = require("./routes/company-names.etanol");
const statisticData = require("./routes/statistic-data");
const rankedList = require('./routes/ranking');

app.use('/company-names/biodiesel', biodieselCompanyNamesRoute);
app.use('/company-names/etanol', etanolCompanyNamesRoute);
app.use('/statistic-data', statisticData);
app.use('/get-ranking', rankedList);

// Connect to DB
mongoose.connect(
  process.env.MONGO_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => { console.log("Connected to DB!") }
)

// LISTENING
app.listen(process.env.PORT || PORT);
console.warn("Listening on port", PORT);
