"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Router} from '../common/router'; //não importa mais
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
            //delete document.password
        });
    }
    applyRoutes(application) {
        //callbacks 
        //findAll
        application.get('/users', this.findAll);
        //get por id
        application.get('/users/:id', [this.validadeId, this.findById]);
        //Alterar usuário
        application.post('/users', this.save);
        //Substitui todo documento do id referente
        application.put('/users/:id', [this.validadeId, this.replace]);
        //Atualizar parte do documento
        //Inserir (application/merge-patch+json) quando for testar
        application.patch('/users/:id', [this.validadeId, this.update]);
        //Deletar documento pelo id
        application.del('/users/:id', [this.validadeId, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
