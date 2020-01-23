'use strict'

const { test, trait } = use('Test/Suite')('Login')
const User = use('App/Models/User')

trait('Test/ApiClient')

test('Should return a user with valid credentials', async ({ client }) => {
  const user = await User.create({
    username: 'johnjacob',
    email: 'test@test.com',
    password: '123123'
  })

  const response = await client.post('/users/login').send({
    user: {
      email: user.email,
      password: '123123'
    }
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    user: {
      email: user.email,
      username: user.username
    }
  })
})
