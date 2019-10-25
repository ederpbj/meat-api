import * from 'restify'

export abstract class Router {
    //Recebe uma instancia da aplicação restify
    //abstract -> não tem implementação
    abstract applyRoutes(application: restify.Server)
}