"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    //retorna primisse, e nenhum tipo especifico any
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                //Cria servidor restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.1'
                });
                //Quando alguém manda uma requisição para api
                //para usar query
                this.application.use(restify.plugins.queryParser());
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
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
