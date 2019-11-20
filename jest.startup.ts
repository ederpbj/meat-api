import * as jestCli from 'jest-cli' 

import {Server} from './src/server/server'
import {environment} from './src/common/environment'
import {usersRouter} from './src/users/users.router'
import {reviewsRouter} from './src/reviews/reviews.router'
import {User} from './src/users/users.model'
import {Review} from './src/reviews/reviews.model'

let server: Server


const beforeAllTests = () =>{
    //usar outra url para desenvolvimento
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([
        usersRouter,
        reviewsRouter
    ])
    .then(()=>User.remove({}).exec())
    .then(()=>Review.remove({}).exec())
}

const afterAllTests = () =>{
    return server.shutdown()
}

//Inicializando servidor
beforeAllTests()
//Startar o jest manualmente
.then(()=> jestCli.run())
//Procura e executa os testes
.then(()=> afterAllTests())
.catch(console.error)