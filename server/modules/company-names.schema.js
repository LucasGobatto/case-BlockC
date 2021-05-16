const mongoose = require('mongoose');

const BiodieselCompanyNames = mongoose.Schema({
  Usina: String
});

const EtanolCompanyNames = mongoose.Schema({
  Usina: String
});

module.exports = {
  biodiesel: mongoose.model("CompanyNames.Biodiesel", BiodieselCompanyNames),
  etanol: mongoose.model("CompanyNames.Etanol", EtanolCompanyNames)
};
