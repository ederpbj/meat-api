import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'


class UsersRouter extends Router {
    applyRoutes(application: restify.Server){
        
        application.get('/users', (req, resp, next) => {
            //Retorna todos os documentos no mongoDB
            User.find().then(users => {
                resp.json(users)
                return next()
            })
        })

        //Outra configuração de rota
        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
                if(user){
                    resp.json(user)
                    return next()
                }

                resp.send(404)
                return next()
            })
        })

        application.post('/users', (req, resp, next) => {
           //Detecta qualquer coisa any
            //let user: any = new User() 
            //req.body, passa todos atributos de uma vez só
           let user = new User(req.body)
           
           //Funciona, mas não indicado se tiver muitos atributos
           //user.name = req.body.name
           
           /* Anterior
           user.name = 'Diana'
           user.email = 'diana@dc.com'
           user.save()
           */

           user.save().then(user=>{
            user.password = undefined
            resp.json(user)
            return next()
           })
        })

    }
}

//Disponível para outros modulos que querem usar
export const usersRouter = new UsersRouter()