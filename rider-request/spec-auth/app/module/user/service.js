import User from "./model";
import { success, ExistsError } from "iyasunday";
import bcrypt from "bcrypt";
import { USERTYPE } from "../../utils/constant";

//Here is where you write the business logic

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
    newUser.userType = body.userType.toUpperCase();
    newUser.permissions = USERTYPE[body.userType.toUpperCase()];
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
