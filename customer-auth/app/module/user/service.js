import User from "./model";
import { success, ExistsError } from "iyasunday";
import bcrypt from "bcrypt";
import { func } from "joi";
// import { USERTYPE } from "../../utils/constant";
const jwt = require('jsonwebtoken');
const { sentEmail } = require('./../../utils/sentMail');

//Here is where you write the business logic


const setAuth = async (user) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return token;
}

//Example here is a signup logic
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

    let newUser = new User();
    newUser.firstname = body.firstname;
    newUser.lastname = body.lastname;
    newUser.email = body.email.trim();
    newUser.phoneNumber = body.phoneNumber;
    newUser.password = body.password;
    // newUser.userType = body.userType.toUpperCase();
    // newUser.permissions = USERTYPE[body.userType.toUpperCase()];
    await newUser.save();
    return {
      success,
      message: `You have successfully created your account, kindly check your email inbox or spam folder to get verification link.`,
      data: await setAuth(newUser),
    };
  } catch (err) {
    throw err;
  }
}


const generateOtp = (to, subject, otp) => {
  return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
}



export async function login(body) {
  try {
    const email = body.email;
    const phoneNumber = body.phoneNumber;
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
    else if (email && !phoneNumber) {
      const otp = generateOtp();
      await sentEmail(email, "Verification Code", `<p>your verification code is ${otp}<p>`);

      const user = await User.findOne({ email: email });
      if (!user) {
        let newUser = new User();
        newUser.email = email;
        newUser.otp = otp;
        await newUser.save();
      }
      else {
        await user.updateOne({ otp: otp });
      }

      return {
        success,
        message: `Otp sent successfully on your email`,
      }
    }
    else if (phoneNumber && !email) {
      const otp = generateOtp();
      // send otp to the mobile number
      const user = await User.findOne({ phoneNumber: phoneNumber });
      if (!user) {
        let newUser = new User();
        newUser.phoneNumber = phoneNumber;
        newUser.otp = otp;
        await newUser.save();
      }
      else {
        await user.updateOne({ otp: otp });
      }

      return {
        success,
        message: `Otp sent successfully on your phoneNumber`,
      }
    }

  } catch (err) {
    throw err;
  }
}


export async function loginVerify(body) {
  try {
    const email = body.email;
    const phoneNumber = body.phoneNumber;
    const otp = body.otp;

    let user;

    if (email && !phoneNumber) {
      user = await User.findOne({ email: email });
    }
    if (phoneNumber && !email) {
      const user = await User.findOne({ phoneNumber: phoneNumber });
    }

    if (!user) {
      throw new Error("Something went wrong");
    }

    if (otp === user.otp) {
      return {
        success,
        message: `You have successfully login`,
        data: await setAuth(user),
      }
    }
  } catch (e) {
    throw e;
  }
}


const getOneUserByFilter = async (query) => {
  try {
    const result = await User.findOne(query).select('-password').lean();
    return result
  } catch (e) {
    throw e;
  }
}

export async function oAuth(body) {
  try {
    const query = [{ 'oAuth.clientId': body.id, 'oAuth.provider': body.provider }];
    if (!body.id || !body.provider) {
      throw new Error("Something went wrong");
    }
    if (body.email) {
      query.push({ email: body.email })
    }
    const user = await getOneUserByFilter({ $or: query })

    if (user) {
      return {
        success,
        message: `You have successfully login`,
        data: await setAuth(user),
      }
    }

    let newUser = new User();
    newUser.firstname = body.firstname;
    newUser.lastname = body.lastname;
    newUser.email = body.email.trim();
    newUser.phoneNumber = body.phoneNumber;
    newUser.oAuth.clientId = body.id;
    newUser.oAuth.provider = body.provider;
    await newUser.save();
    return {
      success,
      message: `You have successfully login`,
      data: await setAuth(newUser),
    }





  } catch (e) {
    throw e;
  }
}
