const express = require('express');
const router = express.Router();

const CompanyNamesSchema = require('../modules/company-names.schema');

// Get all names
router.get('/', async (req, res) => {
  console.log('GET: company-names/etanol/');
  try {
    const names = await CompanyNamesSchema.etanol.find();
    res.status(200).json(names);
  } catch (message) {
    res.status(400).json({ message });
  };
});


router.get('/:usina', async (req, res) => {
  const { usina } = req.params;
  const regex = new RegExp(usina, 'i');
  console.log('GET: company-names/etanol/' + usina);

  try {
    const response = await CompanyNamesSchema.biodiesel.find({ 'Usina': { $regex: regex } });
    res.status(200).json(response)
  } catch (message) {
    res.status(400).json({ message })
  }
});

// Add a name
router.get('/test', async (req, res) => {
  console.log('GET: test:', req.body);

  const post = new CompanyNamesSchema.etanol({
    Usina: req.body.Usina,
  });

  try {
    const response = await post.save();
    res.status(200).json(response);
  } catch (message) {
    res.status(400).json({ message });
  };
});

module.exports = router;
