const Covid = require("../controllers/CovidApi.controllers");

module.exports = app => {
    app.get('/api/covid', Covid.getAll);
}