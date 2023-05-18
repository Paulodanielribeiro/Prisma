import{MongoClient} from 'mongodb'


import {User} from './models/User'
import { UserDAO } from './dao/UserDAO';

const run = async () =>{
  const connection = await MongoClient.connect('mongodb://localhost')
  
  const db = connection.db('users_management')

  const dao = new UserDAO(db)

  const user1 = new User(
    'Maxes Sunny',
    'max24354@gamil.com',
    new Date('1980-07-30')
    )
    const id = await dao.create(user1)
    console.log(`ID:${id}`)

    let user = await dao.findOne(id)
    console.log(user)

    const update = await dao.update(id,{
      email: 'Solbranco@Gmail.com'
    })
    console.log(`Atulizando: ${update}`)
    
    user =  await dao.findOne(id)
    console.log(user)

    const users = await dao.find({
      name: {
        $regex: 'Maxes',
        $options: 'i',
      },
    })

    /*const deleted = await dao.delete(id)
    console.log(`Removido: ${deleted}`
*/
    console.log('Mal feito desfeito')
}

run()