'use strict'

const User = use('App/Models/User')

class AuthController {
  async login ({ request, auth }) {
    const { email, password } = request.all().user
    const token = await auth.attempt(email, password)
    const user = await User.findBy('email', email)
    user.token = token
    return {user}
  }

  async register({ request, auth }) {
    const user = new User()
    user.fill(request.only(['user.username', 'user.password', 'user.email']).user)
    await user.save()
    const newUser = await User.find(user.id)
    newUser.token = await auth.generate(newUser)
    return { user: newUser }
  }
}

module.exports = AuthController
