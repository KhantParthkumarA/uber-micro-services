const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

exports.verifyLogin = (req, res, next) => {
    try {

        const accessToken = req.headers['x-access-token'];
        let rider;
        if (!accessToken) {
            throw new Error("token missing......... ");
        }
        else {
            const details = await verifyToken(accessToken)
            rider = await Rider.findOne({ _id: details.id, type: "RIDER" })
            if (!rider) {
                throw new Error("rider not authorised. ");
            }
            if (!rider.verified) {
                throw new Error("rider not verified");
            }
        }
        next();

    } catch (err) {
        next(err);
    }
}