"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                user.password = undefined;
                resp.json(user);
                return next();
            });
        });
        //Substitui todo documento do id referente
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
        //Atualizar parte do documento
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            //procura e atualiza
            users_model_1.User.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(user => {
                if (user) {
                    //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                    resp.json(user);
                }
                else {
                    resp.send(404);
                    return next();
                }
            });
        });
        //Deletar documento pelo id
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id })
                .exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                    //Procedimento realizado com sucesso!
                    resp.send(204);
                }
                else {
                    resp.send(404);
                }
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
