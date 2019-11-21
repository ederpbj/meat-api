import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import {NotAuthorizedError} from 'restify-errors'

import {User} from '../users/users.model'
import {environment} from '../common/environment'

export const authenticate: restify.RequestHandler = (req, resp, next) => {
    const {email, password} = req.body
    User.findByEmail(email, '+password') //1st
    .then(user => {
        if(user && user.matches(password)){ //2nd
            //gerar o token
            //3rd
            //Criar o token
            /**
             * sub: subject
             * iss: passa de um lado para outro, deve ser curto
             */
            const token = jwt.sign({sub: user.email, iss: 'meat-api'}, 
                            environment.security.apiSecret)
        resp.json({name: user.name, email: user.email, accessToken: token})
        
        //false pois já gerou resposta, não há mais nada após
        return next(false)
        }else{
            return next(new NotAuthorizedError('Invalid Credentials'))
        }

    }).catch(next)
}