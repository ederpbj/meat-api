"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Router} from '../common/router'; //não importa mais
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.find({ email: req.query.email })
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                //se não for de responssábilidade dessa calback, passa adiante
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
            //delete document.password
        });
    }
    applyRoutes(application) {
        //callbacks 
        //findAll, só funciona para essa versão especificada,
        //Se não especificar funciona em todas as versões, 
        //A execusão de versão obedece a ordem de criação, primeiro as mais novas (2.0.0)
        application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll]);
        application.get({ path: '/users', version: '1.0.0' }, this.findAll);
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
