'use strict'

const CustomFormatter = require('./CustomFormatter')

class StoreUser {
  get formatter () {
    return CustomFormatter
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      username: 'required|string|unique:users',
      password: 'required|min:6'
    }
  }

  get data () {
    return this.ctx.request.all().user
  }
}

module.exports = StoreUser
