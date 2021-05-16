const mongoose = require('mongoose');

const BiodieselStatiscticDataSchema = mongoose.Schema({
  Usina: String,
  NEEA: Number,
  Elegibilidade: Number,
  Producao: Number,
  CBIOs: Number,
  overCBIOs: Number,
});

const EtanolStatiscticDataSchema = mongoose.Schema({
  Usina: String,
  Elegibilidade: Number,
  Hidratado: {
    NEEA: Number,
    Producao: Number,
    CBIOs: Number,
    overCBIOs: Number
  },
  Anidro: {
    NEEA: Number,
    Producao: Number,
    CBIOs: Number,
    overCBIOs: Number
  }
});


module.exports = {
  biodiesel: mongoose.model("StatisticData-Biodiesel", BiodieselStatiscticDataSchema),
  etanol: mongoose.model("StatisticData-Etanol", EtanolStatiscticDataSchema)
};
