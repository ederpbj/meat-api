import {Router} from '../common/router';
import * as restify from 'restify';
import {User} from './users.model';

class UsersRouter extends Router {
  applyRoutes(application: restify.Server){

    application.get('/users', (req, resp, next)=>{
      User.find().then(users=>{
        resp.json(users)
        return next()
      })
    })

    application.get('/users/:id', (req, resp, next)=>{
      User.findById(req.params.id).then(user=>{
        if(user){
          resp.json(user)
          return next()
        }
        resp.send(404)
        return next()
      })
    })

    application.post('/users', (req, resp, next)=>{
      let user = new User(req.body)
      user.save().then(user=>{
        user.password = undefined
        resp.json(user)
        return next()
      })
    })

    //Substitui todo documento do id referente
    application.put('/users/:id', (req, resp, next)=>{
      const options  = {overwrite: true}
      User.update({_id:req.params.id}, req.body, options)
          .exec().then(result=>{
            if(result.n){
              //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
              return User.findById(req.params.id)
            }else{
              resp.send(404)
            }
      }).then(user=>{
        resp.json(user)
        return next()
      })
    })

    //Atualizar parte do documento
    application.patch('/users/:id', (req, resp, next)=>{
      const options  = {new: true}
      //procura e atualiza
      User.findByIdAndUpdate({_id:req.params.id}, req.body, options)
          .then(user=>{
            if(user){
              //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
              resp.json(user)
            }else{
              resp.send(404)
              return next()
            }
      })

    })

  }
}

export const usersRouter = new UsersRouter()
