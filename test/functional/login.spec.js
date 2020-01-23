'use strict'

const { test, trait } = use('Test/Suite')('Login')
const Factory = use('Factory')

trait('Test/ApiClient')

test('Should return a user with valid credentials', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client.post('/users/login').send({
    user: {
      email: user.email,
      password: 'secret'
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
