const users = [
    {name:'Peter Parker', email: 'peter@marvel.com'},
    {name:'Bruce Wayne', email: 'bruce@dc.com'}
  ]

//teste para emular, retorna lista de usuários
export class User {
    static findAll(): Promise<any[]>{
      return Promise.resolve(users)
    }
  }