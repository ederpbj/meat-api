import * as restify from 'restify'
import {EventEmitter} from 'events'
import {NotFoundError} from 'restify-errors'

export abstract class Router extends EventEmitter {
  abstract applyRoutes(application: restify.Server)

  //A45 - criando links
  envelope(document: any): any {
    return document
  }

  //A47 Paginação - Skip e Limit
  envelopeAll(documents: any, options: any = {}): any {
    return documents
  }

  render(response: restify.Response, next: restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeRender', document)
        response.json(this.envelope(document))
      }else{
        //response.send(404)
        throw new NotFoundError('Documento não encontrado')
      }
       //Indica ao restifi que a callback terminou de trabalhar
      return next(false)
    }
  }

  renderAll(response: restify.Response, next: restify.Next, options: any = {}){
    return (documents: any[])=>{
      if(documents){
        //documents.forEach(document=>{
        documents.forEach((document, index, array)=>{
          this.emit('beforeRender', document)
          array[index] = this.envelope(document)
        })
        //response.json(documents)
        response.json(this.envelopeAll(documents, options))
      }else{
        //response.json([])
        response.json(this.envelopeAll([]))
      }
      return next(false)
    }
  }
}
