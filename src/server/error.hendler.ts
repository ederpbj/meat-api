import * as restify from 'restify'
import { KeyObject } from 'crypto'

export const handleError = (req: restify.Request, resp: restify.Response, err, done)=>{
  //console.log(err)

//restify procura por esse método, vamos sobrescrever
  err.toJSON = ()=>{
    return {
      message : err.message
    }
  }
  switch(err.name){
    case 'MongoError':
      if(err.code === 11000){
        err.statusCode = 400
      }
      break
    case 'ValidationError':
      err.statusCode = 400
      
      //Exibe erros na tela em forma de array
      const messages: any[] = []
      for(let name in err.errors){
        messages.push({message: err.errors[name].message})
        //console.log(err.errors[name])
      }

      err.toJSON = () => ({
        message: 'Validation error while processing you request',
        errors: messages,
      })
      break
  }
  done()
}
