class CustomFormatter {
  constructor () {
    this.errors = {errors: {}}
  }

  addError (error) {
    if(this.errors.errors[error.field]) {
      return this.errors.errors[error.field].push(error.message)
    }
    return this.errors.errors[error.field] = [error.message]
  }

  toJSON () {
    return this.errors
  }
}

module.exports = CustomFormatter
