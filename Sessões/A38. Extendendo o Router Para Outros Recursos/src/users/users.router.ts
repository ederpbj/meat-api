//import {Router} from '../common/router'; //não importa mais
import {ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import {User} from './users.model';


class UsersRouter extends ModelRouter<User> {
  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.password = undefined
      //delete document.password
    })
  }

  applyRoutes(application: restify.Server){

    //callbacks 
    //findAll
    application.get('/users', this.findAll)
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

  }
}

export const usersRouter = new UsersRouter()
