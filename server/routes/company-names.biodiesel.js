const express = require('express');
const router = express.Router();

const CompanyNamesSchema = require('../modules/company-names.schema');

// Get all names
router.get('/', async (req, res) => {
  console.warn("GET: company-names/biodiesel/");
  try {
    const names = await CompanyNamesSchema.biodiesel.find();
    res.status(200).json(names);
  } catch (message) {
    res.status(400).json({ message });
  };
});

router.get('/:usina', async (req, res) => {
  const { usina } = req.params;
  const regex = new RegExp(usina, "i");
  console.warn("GET: company-names/biodiesel/" + usina);

  try {
    const response = await CompanyNamesSchema.biodiesel.find({ "Usina": { $regex: regex } });
    res.status(200).json(response)
  } catch (message) {
    res.status(400).json({ message })
  }
});

// Add a name
router.post('/', async (req, res) => {
  console.warn("POST: company-names/biodiesel/" + req.body);

  const post = new CompanyNamesSchema.biodiesel({
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
