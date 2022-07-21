import * as service from "./service";

export async function signup(req, res, next) {
    try {
        res.status(200).json(await service.signup(req.body));
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        res.status(200).json(await service.login(req.body));
    } catch (err) {
        next(err);
    }
}


export async function verifyLogin(req, res, next) {
    try {
        const data = await service.verifyLogin(req.headers)
        if (data.flag) {
            req.user = data.user;
            next();
        }
    } catch (err) {
        next(err);
    }
}