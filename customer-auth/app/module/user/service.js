import User from "./model";
import { success, ExistsError } from "iyasunday";
import bcrypt from "bcrypt";
import { func } from "joi";
// import { USERTYPE } from "../../utils/constant";
const jwt = require('jsonwebtoken');

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

export async function login(body) {
  try {
    const email = body.email;
    const password = body.password;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email: email }).select('+password');
    // console.log(email);
    // console.log(password);
    if (!user) {
      throw new Error("Incorrect email and password");
    }

    const correct = await user.correctPassword(password, user.password);
    // console.log(correct);
    if (!correct) {
      throw new Error("Incorrect email and password");
    }

    return {
      success,
      message: `You have successfully login`,
      data: await setAuth(user),
    };
  } catch (err) {
    throw err;
  }
}
