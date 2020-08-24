const mongoose = require("mongoose");

const CovidSchema = new mongoose.Schema({
});

module.exports = mongoose.model("Covid", CovidSchema);