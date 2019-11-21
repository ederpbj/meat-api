import * as restify from 'restify'
import {ForbiddenError} from 'restify-errors'

export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles) => {
    return (req, resp, next) =>{
        //Se o usuário está autenticado & contém uma das profiles(perfis)
        //...profiles (... => spreed) quebra em arrays separados (elemento1, elemento2 ...)
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles)){
            //Pode passar
            next()
        }else{
            next(new ForbiddenError('Permission denied'))
        }
    }
}


