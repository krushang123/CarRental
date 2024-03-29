const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const carRoutes = require("./routes/car");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {useUnifiedTopology: true, useNewUrlParser:true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log("Listening");
});