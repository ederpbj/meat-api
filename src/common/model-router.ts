import { Router } from './router'
import * as mongoose from 'mongoose'
import {NotFoundError} from 'restify-errors'

//D: tipo generico para chamadas
export abstract class ModelRouter<D extends mongoose.Document> extends Router {

  basePath: string

    constructor(protected model: mongoose.Model<D>) {
        super()
        this.basePath = `/${model.collection.name}`
    }

    //Método 2
    protected prepareOne(query: mongoose.DocumentQuery<D,D>):mongoose.DocumentQuery<D,D>{
      return query
    }

    envelope(document: any): any {
      let resource = Object.assign({_links:{}}, document.toJSON())
      resource._links.self = `${this.basePath}/${resource._id}` 
      return resource
    }

    //Checa se o valor é um objectId valido
    validateId = (req, resp, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not Found'))
        }else{
            next()
        }
    }

    //Get all
    findAll = (req, resp, next) => {
        this.model.find()
            .then(this.renderAll(resp, next))
            .catch(next)
    }

    //Get
    findById = (req, resp, next) => {
      //Método 2
        this.prepareOne(this.model.findById(req.params.id))
            .then(this.render(resp, next))
            .catch(next)
    }

    //Post
    //(=>) usado para capturar o this
    save = (req, resp, next)=>{
        let document = new this.model(req.body)
        //Aciona a middleware em users.model
        document.save()
          .then(this.render(resp, next))
          .catch(next)
      }

      replace = (req, resp, next)=>{
        const options = {runValidators: true, overwrite: true}
        this.model.update({_id: req.params.id}, req.body, options)
            .exec().then(result =>{
          if(result.n){
            return this.model.findById(req.params.id)
          } else{
            //resp.send(404)
            throw new NotFoundError('Documento não encontrado')
          }
        })
          .then(this.render(resp, next))
          .catch(next)
      }

      update = (req, resp, next)=>{
        const options  = {runValidators: true, new: true}
        //procura e atualiza
        this.model.findByIdAndUpdate({_id:req.params.id}, req.body, options)
            .then(this.render(resp, next))
            .catch(next)
      }

      delete = (req, resp, next)=>{
        this.model.remove({_id:req.params.id})
            .exec()
            .then((cmdResult: any)=>{
              if(cmdResult.result.n){
                //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                //Procedimento realizado com sucesso!
                resp.send(204)
              }else{
                //resp.send(404)
                throw new NotFoundError('Documento não encontrado')
              }
              return next()
        }).catch(next)
      }
}