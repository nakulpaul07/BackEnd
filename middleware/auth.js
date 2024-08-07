const jwt = require('jsonwebtoken');
const JobModel = require('../model/Job')


const checkUserAuth = async (req, res, next) => {
    // console.log("Middelware")
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        res.status(401).json({ status: "failed", message: "UnauthorizLogined " })
    } else {
        const data = jwt.verify(token, "nakulpalqpeisf124kskffl123")
        const userdata = await JobModel.findOne({ _id: data.ID });
        // console.log(userdata)
        // console.log(data)
        req.userdata = userdata;

        next()
    }
};


module.exports = checkUserAuth