'use strict'

const User = use('App/Models/User')

class ProfileController {
  async show({ params }) {
    const user = await User.query().where('username', params.user).with('following').first()
    return { profile: user.toJSON() }
  }

  async follow({ params, auth }) {
    const user = await User.findByOrFail('username', params.user)
    await auth.user.following().attach([user.id])
    user.following = true
    return { profile: user.toJSON() }
  }

  async unfollow({ params, auth }) {
    const user = await User.findByOrFail('username', params.user)
    await auth.user.following().detach([user.id])
    user.following = false
    return { profile: user.toJSON() }
  }
}

module.exports = ProfileController
