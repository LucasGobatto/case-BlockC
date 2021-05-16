const express = require('express');
const router = express.Router();
const StatisticData = require("../modules/statistic-data.schema");

router.get('/biodiesel', async (req, res) => {
  console.log('GET: get-ranking/biodiesel');

  const info = "NEEA";
  const topNEEA = await StatisticData.biodiesel.find({}).sort({ [info]: -1 }).select(`${info} Usina`).where(info).ne(null).limit(5);
  const bottomNEEA = await StatisticData.biodiesel.find({}).sort({ [info]: 1 }).select(`${info} Usina`).where(info).ne(null).limit(5);

  try {
    res.status(200).json({ topNEEA, bottomNEEA });
  } catch (message) {
    res.status(400).json({ message });
  }
});

router.get('/etanol', async (req, res) => {
  console.log('GET: get-ranking/etanol');

  const info = "Hidratado.NEEA";
  const topNEEA = await StatisticData.etanol.find({}).sort({ [info]: -1 }).select(`${info} Usina`).where(info).ne(null).limit(5);
  const bottomNEEA = await StatisticData.etanol.find({}).sort({ [info]: 1 }).select(`${info} Usina`).where(info).ne(null).limit(5);

  try {
    res.status(200).json({ topNEEA, bottomNEEA });
  } catch (message) {
    res.status(400).json({ message });
  }

})

module.exports = router;
