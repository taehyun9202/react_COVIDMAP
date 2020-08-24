const express = require("express");
const cors = require("cors");
const port = 8000;
const axios = require("axios");
const db_name = "CovidDB"
const app = express();

app.use(cors());
app.use(express.json());

require("./config/mongoose")(db_name);
require("./routes/CovidApi.routes")(app);

// app.get("/covid", (req,res) =>{
//     axios.get("https://www.scorebat.com/video-api/v1/")
//         .then(covids => {res.json(covids.data);})
//         .catch(err => res.json(err));
// })

app.listen(port, ()=> console.log(`Listening on port ${port}`))