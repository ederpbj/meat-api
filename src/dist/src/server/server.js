"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
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
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0',
                    certificate: fs.readFileSync('./src/security/keys/cert.pem'),
                    key: fs.readFileSync('./src/security/keys/key.pem')
                });
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
