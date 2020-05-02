const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorHandler = require("./middlewares/errorHandler");
const carRoutes = require("./routes/car");
const app = express();

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carrental', {useUnifiedTopology: true, useNewUrlParser:true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/cars", carRoutes);

app.use(errorHandler);

app.listen(9000, () => {
    console.log("Listening");
});