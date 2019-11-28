import * as restify from 'restify'
import {ForbiddenError} from 'restify-errors'

export const authorize: (...profiles: string[]) => restify.RequestHandler = (...profiles) => {
    return (req, resp, next) =>{

        //Se o usuário está autenticado & contém uma das profiles(perfis)
        //...profiles (... => spreed) quebra em arrays separados (elemento1, elemento2 ...)
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles)){
            req.log.debug('User %s. is authorized with profiles %j on route %s. Required profiles %j',
                req.authenticated._id, 
                req.authenticated.profiles, 
                req.path(),
                profiles
                )

            //Pode passar
            next()
        }else{
            if(req.authenticated){
                req.log.debug('Permission denied %s. Required profiles: %j. User profiles: %j',
                    req.authenticated._id, profiles, req.authenticated.profiles)
            }
            next(new ForbiddenError('Permission denied'))
        }
    }
}


