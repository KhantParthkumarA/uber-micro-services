import models from '../model';
import { success, ExistsError } from "iyasunday";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

export const setAuth = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
}

export async function signup(body) {
    try {
        const isExist = await models.User.findOne({ email: body.email });
        if (isExist) {
            throw new ExistsError(`${body.email} already Exist`);
        }
        const phoneExist = await models.User.findOne({ phoneNumber: body.phone });
        if (phoneExist) {
            throw new ExistsError("User with Phone Number already exists");
        }

        const user = await models.User.create({ ...body, type: "ADMIN", verified: true });
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
            const user = await models.User.findOne({ email: email }).select('+password');
            console.log(user, password)
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


export async function getCompanyEarning() {
    try {

        const totalOrder = await models.Order().populate("productId").populate("riderId").populate("driverId");
        let response = [];
        let total_earning = 0;
        totalOrder.forEach(el => {
            let price = el.price;
            let com = el.productId.priceDetails.company_commission;

            const driver_earning = (price * 100) / com;
            const company_earning = price - driver_earning;
            total_earning += company_earning;
            el.company_earning = {
                order_id: el._id,
                companyEarning: company_earning
            }
            response.push(x);
        })

        return {
            success,
            message: `You have successfully get company earning`,
            total_earning: total_earning,
            response
        };
    } catch (err) {
        throw err;
    }
}
export async function createSettings(body) {
    try {

        const setting = await models.Setting.create(body)
        return {
            success,
            message: `You have successfully create setting`,
            setting
        };
    } catch (err) {
        throw err;
    }
}

export async function updateSettings(id, body) {
    try {
        const setting = await models.Setting.update({ _id: id }, { $set: body });
        return {
            success,
            message: `You have successfully update setting`,
            setting
        };
    } catch (err) {
        throw err;
    }
}