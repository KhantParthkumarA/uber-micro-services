import { Rider } from "../rider/model";
import { success, ExistsError, AuthenticationError } from "iyasunday";



export async function create(body) {
  try {
    const rider = await Rider.findOne({ _id: body.id });
    if (rider) {
      throw new ExistsError(`${Insurpackage.name} already Exist`);
    }

    const newRider = new Rider();
    newRider.riderFirstName = body.riderFirstName;
    newRider.riderLastName = body.riderLastName;
    newRider.email = body.email;
    newRider.phoneNumber = body.phoneNumber;
    newRider.password = body.password
    await newRider.save();

    return {
      success,
      message: `New Rider Successfully Created`,
      data: newRider,
    };
  } catch (err) {
    throw err;
  }
};
