'use strict'
const {transformer} = require('../../Transformers/Transformer');

const User = use('App/Models/User')

class ProfileController {
  async show({params, auth}) {
    let profile = await User.query().where('username', params.user).with('followers').first()
    return transformer({profile}, auth.user.id)
  }

  async follow({params, auth}) {
    const profile = await User.findByOrFail('username', params.user)
    await auth.user.following().attach([profile.id])
    profile.following = true
    return {profile}
  }

  async unfollow({params, auth}) {
    const profile = await User.findByOrFail('username', params.user)
    await auth.user.following().detach([profile.id])
    profile.following = false
    return {profile}
  }
}

module.exports = ProfileController
