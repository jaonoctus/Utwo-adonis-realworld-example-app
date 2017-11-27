'use strict'

const User = use('App/Models/User')

class FavoriteController {
  async show({ params }) {
    const username = await params.user
    const user = await User.query().where('username', username).with('following').first()
    return { profile: user.toJSON() }
  }

  async follow({ params, auth }) {
    const username = await params.user
    const user = await User.findByOrFail('username', username)
    await auth.user.following().attach([user.id])
    user.following = true
    return { profile: user.toJSON() }
  }

  async unfollow({ params, auth }) {
    const username = await params.user
    const user = await User.findByOrFail('username', username)
    await auth.user.following().detach([user.id])
    user.following = false
    return { profile: user.toJSON() }
  }
}

module.exports = FavoriteController
