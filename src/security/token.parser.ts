import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'

import {User} from '../users/users.model'
import {environment} from '../common/environment'

export const tokenParser: restify.RequestHandler = (req, resp, next) = {
    const token = extractToken(req)
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    }else{
        next()
    }
}

function extractToken(req: restify.Request){

    let token =  undefined

    //Bearer, portador do token
    //Authorization: Bearer TOKEN
    const authorization = req.header('authorization')
    
    //Se o header tiver sido informado
    if(authorization){
        //Separando cabeçalho
        const parts: string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token
}

function applyBearer (req: restify.Request, next): (error, decoded) => void{
    return (error, decoded)=>{
        //Verifica se decodificou 
        if(decoded){
            User.findByEmail(decoded.sub).then(user => {
                if(user){
                    //associa o usuário no request
                    //(<any>req).authenticated = user
                    //Declarado em index.d.ts, na raiz
                    req.authenticated = user
                }
                next()
            }).catch(next)
        }else{
            next()
        }
    }
}