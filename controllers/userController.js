const User = require("../models/user");
const validationHandler = require("../validations/validaionHandler");

exports.index = async(req, res, next) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        next(err)
    }
};


exports.show = async (req, res, next) => {
    try{
        const user = await User.findOne({
            _id: req.params.id
        });

        res.send(user);
    }catch(err){
        next(err);
    }
};

exports.store = async(req, res, next) => {
    try{
    
        validationHandler(req);

        let user = new User();
        user.name = req.body.name;
        user.contactNumber = req.body.contactNumber;

        user = await user.save();

        res.send(user);

    } catch(err){
        next(err);
    }
};

exports.update = async(req, res, next) => {
    try{
        validationHandler(req);

        let user = await User.findById(req.params.id);
        user.name = req.body.name || user.name;
        user.contactNumber = req.body.contactNumber || user.contactNumber;
    

        user = await user.save();

        res.send(user);

    } catch(err){
        next(err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        let user = await User.findById(req.params.id);
        await user.delete();

        res.send({message: "success"});

    }catch(err){
        next(err);
    }
};