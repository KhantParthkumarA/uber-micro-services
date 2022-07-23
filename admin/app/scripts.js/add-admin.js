const { User } = require('./../module/user/model')
const jwt = require('jsonwebtoken');

const setAuth = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
}
const createAdminBody = {

    "name": "admin",
    "email": "admin@gmail.com",
    "password": "admin123",
    "phoneNumber": "9879898987",
    "status": "ACTIVE",
    "verified": true,
    "type": "ADMIN"

}

    (async (body) => {
        try {
            const existingUser = await User.findOne({ email: body.email })
            if (existingUser) {
                console.log('Admin initiated successfully')
                return true;
            }

            const result = await User.create(body)

            const token = setAuth(user)
            return { _id: result._id, token }
        } catch (e) {
            console.log('Add admin script execution failed - ', e)
        }
        return true;
    })(createAdminBody);