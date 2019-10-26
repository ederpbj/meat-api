"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
const mongoose = require("mongoose");
class Server {
    //Conectar ao mongoDb
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    //retorna primisse, e nenhum tipo especifico any
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                //Cria servidor restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.1'
                });
                //Plugins:
                //Quando alguém manda uma requisição para api
                //para usar query
                this.application.use(restify.plugins.queryParser());
                //Identifica que a requisição é um json
                this.application.use(restify.plugins.bodyParser());
                //Routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                //Ouvir porta
                this.application.listen(environment_1.environment.server.port, () => {
                    //console.log('API is running on http://localhost:3000 ')
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    //Retorna Primisse e a propria classe Server
    bootstrap(routers = []) {
        //return this.initRoutes(routers).then(() => this)
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
