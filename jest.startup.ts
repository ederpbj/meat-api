import * as jestCli from 'jest-cli' 

import {Server} from './src/server/server'
import {environment} from './src/common/environment'
import {usersRouter} from './src/users/users.router'
import {reviewsRouter} from './src/reviews/reviews.router'
import {restaurantsRouter} from './src/restaurants/restaurants.router'
import {User} from './src/users/users.model'
import {Review} from './src/reviews/reviews.model'
import { Restaurant } from './src/restaurants/restaurants.model'

let server: Server

const beforeAllTests = () =>{
    //usar outra url para desenvolvimento
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([
        usersRouter,
        reviewsRouter,
        restaurantsRouter,
    ])
    .then(()=>User.remove({}).exec())
    .then(()=>{
        let admin = new User()
        admin.name = 'admin'
        admin.email = 'smit@servidor.com'
        admin.password = '123456'
        admin.profiles = ['admin', 'user']
        return admin.save()
    })
    .then(()=>Review.remove({}).exec())
    .then(()=>Restaurant.remove({}).exec())
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