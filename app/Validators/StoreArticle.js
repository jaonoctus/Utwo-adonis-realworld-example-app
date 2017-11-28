'use strict'

const BaseValidator = require('./BaseValidator')

class StoreArticle extends BaseValidator{
  get rules () {
    return {
      'title': 'required',
      'description': 'required',
      'body': 'required'
    }
  }

  get data () {
    return this.ctx.request.all().article
  }
}

module.exports = StoreArticle
