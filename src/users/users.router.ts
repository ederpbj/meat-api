//import {Router} from '../common/router'; //não importa mais
import {ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import {NotFoundError} from 'restify-errors'

import {User} from './users.model';
import {authenticate} from '../security/auth.handler'
import {authorize} from '../security/authz.handler'


class UsersRouter extends ModelRouter<User> {
  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.password = undefined
      //delete document.password
    })
  }

  findByEmail = (req, resp, next) => {
    if(req.query.email){
      //User.find({email: req.query.email})
      User.findByEmail(req.query.email)
          //Retorna um array
          .then(user => {
            if(user){
              return [user]
            }else{
              return []
            }
          })
          //Para gerar hipelinks
          .then(this.renderAll(resp, next, {
            pageSize: this.pageSize,
            url: req.url
          }))
          .catch(next)
    }else{
      //se não for de responssábilidade dessa calback, passa adiante
      next()
    }
  }

  applyRoutes(application: restify.Server){
    application.get({path:`${this.basePath}`, version: '2.0.0'}, [
      authorize('admin'), 
      this.findByEmail, 
      this.findAll
    ])
    
    application.get({path:`${this.basePath}`, version: '1.0.0'}, authorize('admin'), this.findAll)
    application.get(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.findById])
    application.post(`${this.basePath}`, [authorize('admin'), this.save])
    application.put(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validateId,this.replace])
    application.patch(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validateId,this.update])
    application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId,this.delete])

    //para token
    application.post(`${this.basePath}/authenticate`, authenticate)


/*Antigo
    //callbacks 
    //findAll, só funciona para essa versão especificada,
    //Se não especificar funciona em todas as versões, 
    //A execusão de versão obedece a ordem de criação, primeiro as mais novas (2.0.0)
    application.get({path:'/users', version: '2.0.0'}, [this.findByEmail, this.findAll])
    application.get({path:'/users', version: '1.0.0'}, this.findAll)
    //get por id
    application.get('/users/:id', [this.validadeId ,this.findById])
    //Alterar usuário
    application.post('/users', this.save)
    //Substitui todo documento do id referente
    application.put('/users/:id', [this.validadeId ,this.replace])
    //Atualizar parte do documento
    //Inserir (application/merge-patch+json) quando for testar
    application.patch('/users/:id', [this.validadeId ,this.update])
    //Deletar documento pelo id
    application.del('/users/:id', [this.validadeId ,this.delete])
  */

   

  }
}

export const usersRouter = new UsersRouter()
