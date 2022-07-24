import models from '../module/model'
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt'

const setAuth = async (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
}

const body = {
    "name": "admin",
    "email": "admin@gmail.com",
    "phoneNumber": "1212121212",
    "status": "ACTIVE",
    "verified": true,
    "type": "ADMIN"
};

(async () => {
    try {
        const existingUser = await models.User.findOne({ email: body.email }).lean().exec()
        if (!existingUser) {
            body.password = await bcrypt.hash('A4admin', 12);
        }
        await models.User.updateOne({email: body.email }, body, { upsert: true })   
        console.log('Admin initialize successfully')
    } catch (e) {
        console.log('Add admin script execution failed - ', e)
    }
    return true;
})();