'use strict'

const User = use('App/Models/User')

class AuthController {
  async login ({ request, auth }) {
    const { email, password } = request.all().user
    const token = await auth.attempt(email, password)

    let user = await User.findBy('email', email)
    user = { email: user.email, token, ...user.toJSON() }
    return {user}
  }

  async register({ request, auth }) {
    const user = new User()
    user.fill(request.only(['user.username', 'user.password', 'user.email']).user)
    await user.save()
    const token = await auth.generate(user)

    let newUser = await User.find(user.id)
    newUser = { email: newUser.email, token, ...newUser.toJSON() }
    return { user: newUser }
  }
}

module.exports = AuthController
