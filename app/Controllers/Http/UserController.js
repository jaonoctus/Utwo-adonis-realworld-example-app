'use strict'

const User = use('App/Models/User')

class FavoriteController {
  async index({ request, auth }) {
    const user = await auth.getUser()
    user.token = await auth.generate(user)
    return { user }
  }

  async update({ request, auth }) {
    const user = await User.findOrFail(await auth.user.id)
    const { email } = request.only('user').user
    user.email = email
    await user.save()
    user.token = auth.generate(user)
    return { user }
  }
}

module.exports = FavoriteController
