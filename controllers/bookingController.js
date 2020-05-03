const Booking = require("../models/booking");
const Car = require("../models/car");
const User = require("../models/user");
const validationHandler = require("../validations/validaionHandler");

exports.index = async(req, res, next) => {
    try{
        const bookings = await Booking.find({
            user: req.user.id
        })
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
            _id: req.params.id,
            user: req.user.id
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
        
        if (car === null) {
            let error = new Error("Car does not exists.");
            error.statusCode = 422;
            error.message = "Cannot make bookings for car which does not exists";
            throw error;
    
        }

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
            let error = new Error("Booking already exists.");
            error.statusCode = 422;
            error.message = "Booking exists for the car for given time interval. Try for diffrent time interval";
            throw error;
        }
        

        booking.car = car;
        booking.user = req.user;
        booking.issueDate = new Date(req.body.issueDate);
        booking.returnDate = new Date(req.body.returnDate);


        booking = await booking.save();
        car.bookings.push(booking.id);
        await car.save();
        res.send(booking);
        

    } catch(err){
        next(err);
    }
};