'use strict'

const { formatters } = use('Validator')
const CustomFormatter = require('./CustomFormatter')

class BaseValidator {
  get formatter () {
    formatters.register('customFormatter', CustomFormatter)
    return 'customFormatter'
  }

  async fails (errorMessages) {
    return this.ctx.response.json(errorMessages)
  }
}

module.exports = BaseValidator
