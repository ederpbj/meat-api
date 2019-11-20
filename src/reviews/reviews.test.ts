import 'jest'
import * as request from 'supertest'


let address: string = (<any>global).address

//test.only //Executa somente esse teste
//test.skip //Pula a execussão do teste
test('get /reviews', ()=> {
    return request(address)
        .get('/reviews')
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test.skip('post /reviews', ()=> {
    return request(address)
        .post('/reviews')
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

test('get /reviews/aaaa - not found', ()=>{
    return request(address)
        .get('/reviews/aaaa')
        .then(response=>{
            expect(response.status).toBe(404)
        }).catch(fail)
})

test.skip('path /reviews:id', ()=>{
    return request(address)
        .post('/reviews')
        .send({
            name: 'usuario2',
            email: 'usuario2@email.com',
            password: '123456'
        })
        .then(response=>request(address)
                        .patch(`/reviews/${response.body._id}`)
                        .send({
                            name: 'usuario2 - patch'
                        }))
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('usuario2 - patch')
            expect(response.body.email).toBe('usuario2@email.com')
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})
