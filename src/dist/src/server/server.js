"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const logger_1 = require("../common/logger");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_hendler_1 = require("./error.hendler");
const token_parser_1 = require("../security/token.parser");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    name: 'meat-api',
                    version: '1.1.0',
                    log: logger_1.logger
                };
                if (environment_1.environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment_1.environment.security.certificate),
                        options.key = fs.readFileSync(environment_1.environment.security.key);
                }
                this.application = restify.createServer(options);
                //Prepara o logger
                this.application.pre(restify.plugins.requestLogger({
                    log: logger_1.logger
                }));
                //Plugins:
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                //Recomendação para application/merge-patch+json
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                //Monitora se o request vem com token
                this.application.use(token_parser_1.tokenParser);
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                //Tratamento de erro
                //A33. Tratamento de Erros com Restify
                this.application.on('restifyError', error_hendler_1.handleError);
                //(req, resp, route, error)
                /*this.application.on('after', restify.plugins.auditLogger({
                  log: logger,
                  event: 'after',
                  server: this.application
                }))
        
                this.application.on('audit', data=>{
        
                })*/
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        //console.log('0 - bootstrap')
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    shutdown() {
        //console.log("2-Shutdown")
        return mongoose.disconnect().then(() => this.application.close());
    }
}
exports.Server = Server;
