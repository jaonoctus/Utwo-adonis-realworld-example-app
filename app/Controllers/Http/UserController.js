'use strict'

const User = use('App/Models/User')

class FavoriteController {
  async index({ auth }) {
    const user = await auth.getUser()
    user.token = await auth.generate(user)
    return { user: user.toJSON() }
  }

  async update({ request, auth }) {
    const user = await User.findOrFail(await auth.user.id)
    const { email } = request.only('user').user
    user.email = email
    await user.save()
    user.token = auth.generate(user)
    return { user: user.toJSON() }
  }
}

module.exports = FavoriteController
