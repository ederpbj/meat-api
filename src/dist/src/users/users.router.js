"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
            //delete document.password
        });
    }
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            //Aciona a middleware em users.model
            user.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        //Substitui todo documento do id referente
        application.put('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    //resp.send(404)
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            })
                .then(this.render(resp, next))
                .catch(next);
        });
        //Atualizar parte do documento
        //Inserir (application/merge-patch+json) quando for testar
        application.patch('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, new: true };
            //procura e atualiza
            users_model_1.User.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        //Deletar documento pelo id
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id })
                .exec()
                .then((cmdResult) => {
                if (cmdResult.result.n) {
                    //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                    //Procedimento realizado com sucesso!
                    resp.send(204);
                }
                else {
                    //resp.send(404)
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
