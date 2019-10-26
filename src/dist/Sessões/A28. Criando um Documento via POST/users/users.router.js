"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            //Retorna todos os documentos no mongoDB
            users_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        //Outra configuração de rota
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
            //Detecta qualquer coisa any
            //let user: any = new User() 
            //req.body, passa todos atributos de uma vez só
            let user = new users_model_1.User(req.body);
            //Funciona, mas não indicado se tiver muitos atributos
            //user.name = req.body.name
            /* Anterior
            user.name = 'Diana'
            user.email = 'diana@dc.com'
            user.save()
            */
            user.save().then(user => {
                user.password = undefined;
                resp.json(user);
                return next();
            });
        });
    }
}
//Disponível para outros modulos que querem usar
exports.usersRouter = new UsersRouter();
