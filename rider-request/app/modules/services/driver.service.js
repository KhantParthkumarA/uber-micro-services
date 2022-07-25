import models from '../model/index';
import { success, ExistsError } from "iyasunday";

export async function getDriver(id) {
    try {
        const driver = await models.Driver.findOne({ _id: id }).populate("product_id");
        if (!driver) {
            throw new ExistsError(`${id} driver not Exist`);
        }
        return {
            success,
            message: `You have successfully get your driver`,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}