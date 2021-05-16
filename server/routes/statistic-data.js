const express = require('express');
const router = express.Router();

const StatisticData = require('../modules/statistic-data.schema');

// get back 20 the statistic data 
router.get('/:product', async (req, res) => {
  console.warn('GET: statistic-data/' + req.params.product);

  try {
    const names = await StatisticData[req.params.product].find().limit(20);
    res.status(200).json(names);
  } catch (message) {
    res.status(400).json({ message });
  };
});

// get specific data
router.get('/get-one/:product&:usina', async (req, res) => {
  const { product, usina } = req.params;
  console.warn('GET: statistic-data/get-one/' + product + '&' + usina)

  try {
    const response = await StatisticData[product].findOne({ 'Usina': usina });
    res.status(200).json(response);
  } catch (message) {
    res.status(400).json({ message })
  }
});

router.get('/get-details/biodiesel/:info', async (req, res) => {
  const { info } = req.params;
  console.info('GET: statistic-data/get-details/biodiesel/' + info);

  try {
    const { [info]: max } = await StatisticData.biodiesel.findOne({}).sort({ [info]: -1 }).select(info).where(info).ne(null);
    const response = await StatisticData.biodiesel.find({}).where(info).select(info).ne(null);
    let average = 0;
    let index = 0;
    let min = max;
    response.forEach(element => {
      if (element[info]) {
        average += element[info];
        index += 1;
        min = min > element[info] ? element[info] : min;
      };
    });
    average = (average / index);

    res.status(200).json({ max, min, average });
  } catch (message) {
    res.status(400).json({ message });
  };
});

router.get('/get-details/etanol/:type&:info', async (req, res) => {
  const { info, type } = req.params;
  console.info('GET: statistic-data/get-details/etanol/' + type + '&' + info);

  try {
    const resMax = await StatisticData.etanol.findOne({}).select(type).sort({ [`${type}.${info}`]: -1 }).where(`${type}.${info}`).ne(null);
    const resAverage = await StatisticData.etanol.find({}).select(type).select(`${type}.${info}`).where(`${type}.${info}`).ne(null);

    let average = 0;
    let index = 0;
    let min = resMax[type][info];
    resAverage.forEach(element => {
      if (element[type][info]) {
        average += element[type][info];
        index += 1;
        min = min > element[type][info] ? element[type][info] : min;
      };
    });
    average = (average / index);

    res.status(200).json({ max: resMax[type][info], min, average });
  } catch (message) {
    res.status(400).send({ message });
  };
});

router.get('/get-details/etanol/elegibilidade', async (req, res) => {
  console.info('GET: statistic-data/get-details/etanol/elegibilidade');

  try {
    const { ['Elegibilidade']: max } = await StatisticData.etanol.findOne({}).sort({ 'Elegibilidade': -1 }).select('Elegibilidade').where('Elegibilidade').ne(null);
    const response = await StatisticData.etanol.find({}).where('Elegibilidade').select('Elegibilidade').ne(null);

    let average = 0;
    let index = 0;
    let min = max;
    response.forEach(element => {
      if (element['Elegibilidade']) {
        average += element['Elegibilidade'];
        index += 1;
        min = min > element['Elegibilidade'] ? element['Elegibilidade'] : min;
      };
    });
    average = (average / index);

    res.status(200).json({ max, min, average });
  } catch (message) {
    res.status(400).json({ message });
  };
});


router.post('/:product', async (req, res) => {
  console.log('POST: statistic data for', product.concat(':'), req.body);

  let post;
  if (req.params.product === 'biodiesel') {
    post = new StatisticData[req.params.product]({
      Usina: req.body.Usina,
      NEEA: req.body.NEEA,
      Elegibilidade: req.body.Elegibilidade,
      Producao: req.body.Producao,
      CBIOs: req.body.CBIOs,
      overCBIOs: req.body.overCBIOs,
    });
  } else if (req.params.product === 'etanol') {
    post = new StatisticData[req.params.product]({
      Usina: req.body.Usina,
      Elegibilidade: req.body.Elegibilidade,
      Hidratado: {
        NEEA: req.body.Hidratado.NEEA,
        Producao: req.body.Hidratado.Producao,
        CBIOs: req.body.Hidratado.CBIOs,
        overCBIOs: req.body.Hidratado.overCBIOs,
      },
      Anidro: {
        NEEA: req.body.Anidro.NEEA,
        Producao: req.body.Anidro.Producao,
        CBIOs: req.body.Anidro.CBIOs,
        overCBIOs: req.body.Anidro.overCBIOs,
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid product' });
  }

  try {
    const response = await post.save();
    res.status(200).json(response);
  } catch (message) {
    res.status(400).json({ message });
  }
})

module.exports = router;
