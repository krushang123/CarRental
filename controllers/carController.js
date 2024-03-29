const Car = require("../models/car");
const validationHandler = require("../validations/validaionHandler");

exports.index = async(req, res, next) => {
    try{
        const cars = await Car.find().populate("bookings");
        res.send(cars);
    }catch(err){
        next(err)
    }
};


exports.show = async (req, res, next) => {
    try{
        const car = await Car.findOne({
            _id: req.params.id
        }).populate("bookings");

        res.send(car);
    }catch(err){
        next(err);
    }
};

exports.store = async(req, res, next) => {
    try{
    
        validationHandler(req);

        let car = new Car();
        car.vehicleNumber = req.body.vehicleNumber;
        car.model = req.body.model;
        car.city = req.body.city;
        car.seatingCapacity = req.body.seatingCapacity;
        car.rentPerDay = req.body.rentPerDay;

        car = await car.save();

        res.send(car);

    } catch(err){
        next(err);
    }
};

exports.update = async(req, res, next) => {
    try{
        validationHandler(req);


        let car = await Car.findById(req.params.id).populate("bookings");
        if(car.bookings.length > 0) {
            const error = new Error("Booking already exists.");
            error.statusCode = 422;
            error.message = "Booking exists for the give car.";
            throw error;
        }
        car.vehicleNumber = req.body.vehicleNumber || car.vehicleNumber;
        car.model = req.body.model || car.model;
        car.city = req.body.city || car.city;
        car.seatingCapacity = req.body.seatingCapacity || car.seatingCapacity;
        car.rentPerDay = req.body.rentPerDay || car.rentPerDay;

        car = await car.save();

        res.send(car);

    } catch(err){
        next(err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        let car = await Car.findById(req.params.id).populate("bookings");
        if(car.bookings.length > 0) {
            const error = new Error("Booking already exists.");
            error.statusCode = 422;
            error.message = "Booking exists for the give car.";
            throw error;
        }
        await car.delete();

        res.send({message: "success"});

    }catch(err){
        next(err);
    }
};