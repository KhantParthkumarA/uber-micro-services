const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

exports.verifyLogin = (req, res, next) => {
    try {

        // const accessToken = req.headers['x-access-token'];
        // let user;
        // if (!accessToken) {
        //     throw new Error("token missing......... ");
        // }
        // else {
        //     const details = await verifyToken(accessToken)
        //     user = await User.findOne({ _id: details.id, type: "ADMIN" })
        //     if (!user) {
        //         throw new Error("admin not authorised. ");
        //     }
        //     if (!user.verified) {
        //         throw new Error("admin not verified");
        //     }
        // }
        next();

    } catch (err) {
        next(err);
    }
}