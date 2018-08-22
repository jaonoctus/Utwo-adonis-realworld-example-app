'use strict'

const CustomFormatter = require('./CustomFormatter')

class StoreArticle {
  get formatter () {
    return CustomFormatter
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
      body: 'required'
    }
  }

  get data () {
    return this.ctx.request.all().article
  }
}

module.exports = StoreArticle
