const { User } = require('./model')
import { success, ExistsError } from "iyasunday";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

const setAuth = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
}

export async function signup(body) {
    try {
        const isExist = await User.findOne({ email: body.email });
        if (isExist) {
            throw new ExistsError(`${body.email} already Exist`);
        }
        const phoneExist = await User.findOne({ phoneNumber: body.phone });
        if (phoneExist) {
            throw new ExistsError("User with Phone Number already exists");
        }

        const user = await User.create({ ...body, type: "ADMIN", verified: true });
        return {
            success,
            message: `You have successfully created your account`,
            data: {
                token: await setAuth(user),
                user
            }

        };
    } catch (err) {
        throw err;
    }
}


export async function login(body) {
    try {
        const email = body.email;
        // const phoneNumber = body.phoneNumber;
        const password = body.password;

        if (email && password) {
            const user = await User.findOne({ email: email }).select('+password');

            if (!user) {
                throw new Error("Incorrect email and password");
            }

            const correct = await user.correctPassword(password, user.password);

            if (!correct) {
                throw new Error("Incorrect email and password");
            }


            return {
                success,
                message: `You have successfully login`,
                data: await setAuth(user),
            };
        }
        // else if (email && !phoneNumber) {
        //     const otp = generateOtp();
        //     await sentEmail(email, "Verification Code", `<p>your verification code is ${otp}<p>`);

        //     const user = await User.findOne({ email: email });
        //     if (!user) {
        //         let newUser = new User();
        //         newUser.email = email;
        //         newUser.otp = otp;
        //         await newUser.save();
        //     }
        //     else {
        //         await user.updateOne({ otp: otp });
        //     }

        //     return {
        //         success,
        //         message: `Otp sent successfully on your email`,
        //     }
        // }
        // else if (phoneNumber && !email) {
        //     const otp = generateOtp();
        //     // send otp to the mobile number
        //     const user = await User.findOne({ phoneNumber: phoneNumber });
        //     if (!user) {
        //         let newUser = new User();
        //         newUser.phoneNumber = phoneNumber;
        //         newUser.otp = otp;
        //         await newUser.save();
        //     }
        //     else {
        //         await user.updateOne({ otp: otp });
        //     }

        //     return {
        //         success,
        //         message: `Otp sent successfully on your phoneNumber`,
        //     }
        // }

    } catch (err) {
        throw err;
    }
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

export async function verifyLogin(headers) {
    try {
        const accessToken = headers['x-access-token'];
        let user;
        if (!accessToken) {
            throw new Error("token missing......... ");
        }
        else {
            const details = await verifyToken(accessToken)
            user = await User.findOne({ _id: details.id, type: "ADMIN" })
            if (!user) {
                throw new Error("admin not authorised. ");
            }
            if (!user.verified) {
                throw new Error("admin not verified");
            }
        }

        return {
            user: user,
            flag: true
        };
    } catch (err) {
        throw err;
    }
}
