"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const server_1 = require("./src/server/server");
const environment_1 = require("./src/common/environment");
const users_router_1 = require("./src/users/users.router");
const reviews_router_1 = require("./src/reviews/reviews.router");
const users_model_1 = require("./src/users/users.model");
const reviews_model_1 = require("./src/reviews/reviews.model");
let server;
const beforeAllTests = () => {
    //usar outra url para desenvolvimento
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server.bootstrap([
        users_router_1.usersRouter,
        reviews_router_1.reviewsRouter
    ])
        .then(() => users_model_1.User.remove({}).exec())
        .then(() => reviews_model_1.Review.remove({}).exec());
};
const afterAllTests = () => {
    return server.shutdown();
};
//Inicializando servidor
beforeAllTests()
    //Startar o jest manualmente
    .then(() => jestCli.run())
    //Procura e executa os testes
    .then(() => afterAllTests())
    .catch(console.error);
