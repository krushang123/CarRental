exports.index = (req, res) => {
    throw new Error("some random error");
    res.send({message: "hi"});
};