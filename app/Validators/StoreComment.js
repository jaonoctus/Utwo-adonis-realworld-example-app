'use strict'

const BaseValidator = require('./BaseValidator')

class StoreComment extends BaseValidator {
  get rules () {
    return {
      'body': 'required',
    }
  }

  get data () {
    return this.ctx.request.all().comment
  }
}

module.exports = StoreComment
