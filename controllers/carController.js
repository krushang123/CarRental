const validationHandler = require("../validations/validaionHandler");

exports.index = (req, res) => {
    res.send({message: "hi"});
};

exports.store = (req, res, next) => {
    try{
        validationHandler(req);

        res.send({message: "The car model is " + req.body.model});
    } catch(err){
        next(err);
    }
};