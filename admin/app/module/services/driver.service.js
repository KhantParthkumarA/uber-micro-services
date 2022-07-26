import models from '../../module/model';
import { success, ExistsError } from "iyasunday";
const { dataTable } = require('../../utils/constant');

export async function createDriver(body) {
    try {
        const isExist = await models.Driver.findOne({ product_id: body.product_id });
        if (isExist) {
            throw new ExistsError(`${body.firstname} already Exist`);
        }

        return {
            success,
            message: `You have successfully created your driver`,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}

export async function getAllDriver() {
    try {
        const driver = await models.Driver.find().populate("product_id");

        let approve = 0;
        let pending = 0;
        let reject = 0;
        let block = 0;

        driver.forEach(element => {
            const status = element.status;
            if (status == "APPROVE") {
                approve++;
            }
            if (status == "PENDING") {
                pending++;
            }
            if (status == "REJECT") {
                reject++;
            }
            if (status == "BLOCK") {
                block++;
            }
        });
        return {
            success,
            message: `You have successfully get all driver`,
            data: driver,
            request: {
                pending: pending,
                approve: approve,
                complete: approve + reject
            },
        };
    } catch (err) {
        throw err;
    }
}

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

export async function deleteDriver(id) {
    try {
        const driver = await models.Driver.deleteOne({ _id: id });

        return {
            success,
            message: `You have successfully delete your driver`,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}

export async function updateDriver(id, body) {
    try {
        const driver = await models.Driver.update({ _id: id }, { $set: body });
        return {
            success,
            message: `You have successfully update your driver`,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}

export async function getDriverLiveLocation(params) {
    try {

        const skip = params.skip ? params.skip : dataTable.skip;
        const limit = params.limit ? params.limit : dataTable.limit;

        let searchFilter = {}
        if (params.search) {
            searchFilter = {
                drive_status: params.search,
            }
        }

        const driver = await models.Driver.find(searchFilter, { _id: 1, liveLocation: 1, drive_status: 1, firstName: 1 }).skip(skip).limit(limit).lean();
        return {
            success,
            message: `You have successfully get your driver location`,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}

export async function getUnapproveDriver() {
    try {
        const driver = await models.Driver.find({ status: "PENDING" }).populate("product_id");
        return {
            success,
            message: `You have successfully get unapprove driver `,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}

export async function getApproveDriver() {
    try {
        const driver = await models.Driver.find({ status: "APPROVE" }).populate("product_id");
        return {
            success,
            message: `You have successfully get approve driver `,
            data: driver,
        };
    } catch (err) {
        throw err;
    }
}


export async function getDriverEarning(id) {
    try {
        const totalOrder = await models.Order({ driverId: id }).populate("productId");
        let response = [];
        let total_earning = 0;
        totalOrder.forEach(el => {
            let price = el.price;
            let com = el.productId.priceDetails.company_commission;

            const driver_earning = (price * 100) / com;
            total_earning += driver_earning;
            let x = {
                order_id: el._id,
                driverEarning: driver_earning
            }
            response.push(x);
        })

        return {
            success,
            message: `You have successfully get driver earning`,
            driver_id: id,
            total_earning: total_earning,
            response
        };
    } catch (err) {
        throw err;
    }
}

export async function getDriverDetailWithRideHistory(id) {
    try {
        const driverDetails = await models.Driver.find();
        if (!driverDetails) {
            await Promise.all(driverDetails.forEach(async el => {
                const totalOrder = await models.Order.findOne({ driverId: el._id });
                el.rideHistory = totalOrder;
            }))
        }


        return {
            success,
            message: `You have successfully get driver details with ride history`,
            driverDetails
        };
    } catch (err) {
        throw err;
    }
}
