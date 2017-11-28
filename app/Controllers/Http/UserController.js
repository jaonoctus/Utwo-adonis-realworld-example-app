'use strict'

const User = use('App/Models/User')

class UserController {
  async index({ auth }) {
    const user = auth.user
    user.token = await auth.generate(user)
    return { user: user.toJSON() }
  }

  async update({ request, auth }) {
    const user = auth.user
    const {email, username, password, image, bio} = request.only('user').user
    user.merge({email, username, password, image, bio})
    await user.save()
    user.token = await auth.generate(user)
    return {user: user.toJSON()}
  }
}

module.exports = UserController
