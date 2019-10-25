import * as restify from 'restify'
import {environment} from '../common/environment'

export class Server {
    //Criar uma application
    application: restify.Server

    //retorna primisse, e nenhum tipo especifico any
    initRoutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                //Cria servidor restify
                //const server = restify.createServer({
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.1'
                })

                //Quando alguém manda uma requisição para api
                //para usar query
                this.application.use(restify.plugins.queryParser())

                //Ouvir porta
                this.application.listen(environment.server.port, () => {
                    //console.log('API is running on http://localhost:3000 ')
                    resolve(this.application)
                })

                //Monitorar erro, sem isso a aplicação pare de vez (Recomendado)
                //this.application.on('error', err)

                //Routes
                //Origin
                this.application.get('/hello', (req, resp, next) => {
                    //resp.contentType = 'application/json';
                    resp.setHeader('Content-Type', 'application/json')
                    //resp.status(400)
                    resp.send({ message: 'send hello' });
                    //resp.json({message: 'hello'})
                    return next()
                })


                this.application.get('/info', [
                    (req, resp, next) => {
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            //resp.status(400)
                            //  resp.json({message: 'Please, update your browser'})
                            let error: any = new Error()
                            error.statusCode = 400
                            error.message = 'Please, update your browser'
                            return next(error)
                        }
                        return next()
                    }, (req, resp, next) => {
                        //resp.contentType = 'application/json';
                        //resp.status(400)
                        //resp.setHeader('Content-Type','application/json')
                        //resp.send({message: 'hello'});
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        })
                        return next()
                    }])

            } catch (error) {
                reject(error)
            }
        })
    }

    //Retorna Primisse e a propria classe Server
    bootstrap(): Promise<Server> {
        return this.initRoutes().then(() => this)
    }
}