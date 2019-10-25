import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'
import { response } from 'spdy'


class UsersRouter extends Router {
    applyRoutes(application: restify.Server){
        
        application.get('/users', (req, resp, next) => {
            //resp.json({message: 'users router'})
            //Simular uma query no DB
            User.findAll().then(users => {
                resp.json(users)
                return next()
            })
        })

        //Outra configuração de rota
        application.get('/users/:id', (req, resp, next) => {
            //resp.json({message: 'users router'})
            //Simular uma query no DB
            User.findById(req.params.id).then(user => {
                if(user){
                    resp.json(user)
                    return next()
                }

                response.send(404)
                return next()
            })
        })
    }
}

//Disponível para outros modulos que querem usar
export const usersRouter = new UsersRouter()