import insurancePackage from "../insurancePackage/model";
import { success, ExistsError, AuthenticationError } from "iyasunday";



export async function create(body) {
  try {
    const Insurpackage = await insurancePackage.findOne({ _id: body._id });
    if (Insurpackage) {
      throw new ExistsError(`${Insurpackage.name} already Exist`);
    }
   
      const newPackage = new insurancePackage();
      newPackage.name = body.name;
      newPackage.insuranceType = body.insuranceType.toUpperCase();
      newPackage.description = body.description;
      newPackage.insuranceValue = body.insuranceValue;
      await newPackage.save();

    return {
      success,
      message: `New Insurance Package Successfully Created`,
      data: newPackage,
    };
  } catch (err) {
    throw err;
  }
};
