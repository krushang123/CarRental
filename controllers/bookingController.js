const Booking = require("../models/booking");
const Car = require("../models/car");
const User = require("../models/user");
const validationHandler = require("../validations/validaionHandler");

exports.index = async(req, res, next) => {
    try{
        const bookings = await Booking.find()
        .populate("car")
        .populate("user");
        res.send(bookings);
    }catch(err){
        next(err)
    }
};


exports.show = async (req, res, next) => {
    try{
        const booking = await Booking.findOne({
            _id: req.params.id
        })
        .populate("car")
        .populate("user");

        res.send(booking);
    }catch(err){
        next(err);
    }
};

exports.store = async(req, res, next) => {
    try{
    
        validationHandler(req);

        let booking = new Booking();
        let car = await Car.findById({
            _id: req.body.carId
        });
        let user = await User.findById({
            _id: req.body.userId
        });

        let existingBookings = await Booking.find({
            "car": req.body.carId,
            issueDate: {
                $gte: new Date(new Date(req.body.issueDate).setHours(0,0,0)),
                $lt: new Date(new Date(req.body.returnDate).setHours(23,59,59))
            },
            returnDate: {
                $gte: new Date(new Date(req.body.issueDate).setHours(0,0,0)),
                $lt: new Date(new Date(req.body.returnDate).setHours(23,59,59))
            }

        }).exec();
        
        if(existingBookings.length > 0) {
            const error = new Error("Booking already exists.");
            error.statusCode = 422;
            error.message = "Booking exists for the car for given time interval. Try for diffrent time interval";
            throw error;
        }
        //console.log(alreadyBooked);

        booking.car = car;
        booking.user = user;
        booking.issueDate = new Date(req.body.issueDate);
        booking.returnDate = new Date(req.body.returnDate);


        booking = await booking.save()
        car.bookings.push(booking);
        await car.save();
        res.send(booking);
        

    } catch(err){
        next(err);
    }
};
/*
exports.update = async(req, res, next) => {
    try{
        validationHandler(req);

        let booking = await Booking.findById(req.params.id);
        
    

        booking = await booking.save();

        res.send(booking);

    } catch(err){
        next(err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        let booking = await Booking.findById(req.params.id);
        await booking.delete();

        res.send({message: "success"});

    }catch(err){
        next(err);
    }
};
*/