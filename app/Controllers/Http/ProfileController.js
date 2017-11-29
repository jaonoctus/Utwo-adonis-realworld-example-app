'use strict'

const User = use('App/Models/User')

class ProfileController {
  async show({ params }) {
    const profile = await User.query().where('username', params.user).with('following').first()
    return { profile }
  }

  async follow({ params, auth }) {
    const profile = await User.findByOrFail('username', params.user)
    await auth.user.following().attach([user.id])
    profile.following = true
    return { profile }
  }

  async unfollow({ params, auth }) {
    const profile = await User.findByOrFail('username', params.user)
    await auth.user.following().detach([user.id])
    profile.following = false
    return { profile }
  }
}

module.exports = ProfileController
