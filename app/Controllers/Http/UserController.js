'use strict'

const User = use('App/Models/User')

class UserController {
  async index({ auth }) {
    let user = auth.user
    user.token = await auth.generate(user)
    user = { email: user.email, ...user.toJSON() }
    return { user }
  }

  async update({ request, auth }) {
    let user = auth.user
    const { email, username, password, image, bio } = request.only('user').user
    user.merge({ email, username, password, image, bio })
    await user.save()
    user.token = await auth.generate(user)
    user = { email: user.email, ...user.toJSON() }
    return { user }
  }
}

module.exports = UserController
