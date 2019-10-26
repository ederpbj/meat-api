"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const spdy_1 = require("spdy");
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
        //Outra configuração de rota
        application.get('/users/:id', (req, resp, next) => {
            //resp.json({message: 'users router'})
            //Simular uma query no DB
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                spdy_1.response.send(404);
                return next();
            });
        });
    }
}
//Disponível para outros modulos que querem usar
exports.usersRouter = new UsersRouter();
