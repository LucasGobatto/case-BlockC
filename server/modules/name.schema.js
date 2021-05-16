const mongoose = require('mongoose');

const NameSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("GetNames", NameSchema);
