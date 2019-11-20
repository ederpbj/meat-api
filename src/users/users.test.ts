import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import {environment} from '../common/environment'
import {usersRouter} from '../users/users.router'
import {User} from '../users/users.model'

let server: Server
let address: string

beforeAll(()=>{
    //usar outra url para desenvolvimento
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    address = `http://localhost:${environment.server.port}`
    server = new Server()
    return server.bootstrap([usersRouter])
                 .then(()=>User.remove({}).exec())
                 .catch(console.error)

}) 


test('get /users', ()=> {
    return request(address)
        .get('/users')
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('post /users', ()=> {
    return request(address)
        .post('/users')
        .send({
            name: 'usuario1',
            email: 'usuario@email.com',
            password: '123456',
            cpf: '505.838.180-05'
        })
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('usuario1')
            expect(response.body.email).toBe('usuario@email.com')
            expect(response.body.cpf).toBe('505.838.180-05')
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
        
})

  afterAll(() => {
      console.log('1 - afterAll')
      return server.shutdown()
    });