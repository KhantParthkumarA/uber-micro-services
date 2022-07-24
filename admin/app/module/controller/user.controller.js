import * as service from "../services/user.service";

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

export async function companyEarning(req, res, next) {
    try {
        res.status(200).json(await service.getCompanyEarning());
    } catch (err) {
        next(err);
    }
}

export async function createSetting(req, res, next) {
    try {
        res.status(200).json(await service.createSettings(req.body));
    } catch (err) {
        next(err);
    }
}

export async function updateSetting(req, res, next) {
    try {
        res.status(200).json(await service.updateSettings(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
}