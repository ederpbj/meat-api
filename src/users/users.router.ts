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

  findByEmail = (req, resp, next) => {
    if(req.query.email){
      User.find({email: req.query.email})
          .then(this.renderAll(resp, next))
          .catch(next)
    }else{
      //se não for de responssábilidade dessa calback, passa adiante
      next()
    }
  }

  applyRoutes(application: restify.Server){

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

  }
}

export const usersRouter = new UsersRouter()
