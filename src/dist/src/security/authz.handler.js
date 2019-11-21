"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (req, resp, next) => {
        //Se o usuário está autenticado & contém uma das profiles(perfis)
        //...profiles (... => spreed) quebra em arrays separados (elemento1, elemento2 ...)
        if (req.authenticated !== undefined && req.authenticated.hasAny(...profiles)) {
            //Pode passar
            next();
        }
        else {
            next(new restify_errors_1.ForbiddenError('Permission denied'));
        }
    };
};
