import * as fs from 'fs'
import * as restify from 'restify'
import * as mongoose from 'mongoose'

import { environment } from '../common/environment'
import { logger } from '../common/logger'

import { Router } from '../common/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.hendler'
import {tokenParser} from '../security/token.parser'

export class Server {

  //Comando para conectar via shell
  //mongo "mongodb+srv://cluster0-63wpp.mongodb.net/test"  --username ederpbj

  application: restify.Server

  initializeDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise

    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    })

  }

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {

        const options: restify.ServerOptions = {
          name: 'meat-api',
          version: '1.1.0',
          log: logger
        }

        if(environment.security.enableHTTPS){
          options.certificate = fs.readFileSync(environment.security.certificate),
          options.key = fs.readFileSync(environment.security.key)
        }

        this.application = restify.createServer(options)

        //Prepara o logger
        this.application.pre(restify.plugins.requestLogger({
          log: logger
        }))

        //Plugins:
        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())
        //Recomendação para application/merge-patch+json
        this.application.use(mergePatchBodyParser)
        //Monitora se o request vem com token
        this.application.use(tokenParser)

        //routes
        for (let router of routers) {
          router.applyRoutes(this.application)
        }

        this.application.listen(environment.server.port, () => {
          resolve(this.application)
        })

        //Tratamento de erro
        //A33. Tratamento de Erros com Restify
        this.application.on('restifyError', handleError)
         //(req, resp, route, error)
        /*this.application.on('after', restify.plugins.auditLogger({
          log: logger,
          event: 'after',
          server: this.application
        }))

        this.application.on('audit', data=>{

        })*/
        
      } catch (error) {
        reject(error)
      }
    })
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    //console.log('0 - bootstrap')
    return this.initializeDb().then(() =>
      this.initRoutes(routers).then(() => this))
  }

  shutdown() {
    //console.log("2-Shutdown")
    return mongoose.disconnect().then(() => this.application.close())
  }

}
