import * as restify from 'restify'
import {EventEmitter} from 'events'
import {NotFoundError} from 'restify-errors'

export abstract class Router extends EventEmitter {
  abstract applyRoutes(application: restify.Server)

  render(response: restify.Response, next: restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeRender', document)
        response.json(document)
      }else{
        //response.send(404)
        throw new NotFoundError('Documento não encontrado')
      }
       //Indica ao restifi que a callback terminou de trabalhar
      return next()
    }
  }

  renderAll(response: restify.Response, next: restify.Next){
    return (documents: any[])=>{
      if(documents){
        documents.forEach(document=>{
          this.emit('beforeRender', document)
        })
        response.json(documents)
      }else{
        response.json([])
      }
    }
  }
}
