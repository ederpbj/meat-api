"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            //resp.json({message: 'users router'})
            //Simular uma query no DB
            users_model_1.User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });
    }
}
//Disponível para outros modulos que querem usar
exports.usersRouter = new UsersRouter();
