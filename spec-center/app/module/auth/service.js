import user from "../user/model";
import { success, ExistsError, AuthenticationError } from "iyasunday";
import bcrypt from 'bcrypt';


export async function signup(body) {
  try {
    const isExist = await user.findOne({ email: body.email });
    if (isExist) {
      throw new ExistsError(`${body.email} already Exist`);
    }
    const phoneExist = await user.findOne({ phoneNumber: body.phone });
    if (phoneExist) {
      throw new ExistsError('User with Phone Number already exists');
    }

    let newUser = new user();
   if (body.userType === 'ORGANIZATION'){
      newUser.organizationName = body.organizationName;
      newUser.noOfStaffs = body.noOfStaffs;
      newUser.email = body.email.trim();
      newUser.phoneNumber = body.phoneNumber;
      newUser.password = body.password;
      newUser.userType = 'ORGANIZATION';
      await newUser.save();
  }else {
      newUser.firstname = body.firstname;
      newUser.lastname = body.lastname;
      newUser.email = body.email.trim();
      newUser.phoneNumber = body.phoneNumber;
      newUser.password = body.password;
      newUser.userType = 'INDIVIDUAL';
      await newUser.save();
  }
    return {
      success,
      message: `You have successfully created your account, kindly check your email inbox or spam folder to get verification link.`,
      data: newUser,
    };
  } catch (err) {
    throw err;
  }
};

export async function login(body) {
  try {
    const {email, password} = body;
    const exist = await user.findOne({ email}).select('+password');
    if (!exist) {
      throw new AuthenticationError(` Invalid Credentials`);
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch){
      throw new AuthenticationError(` Invalid Credentials`);
    }
    return {
      success,
      data: exist,
    };
  } catch (err) {
    throw err;
  }
};