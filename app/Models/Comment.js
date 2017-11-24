'use strict'

const Model = use('Model')

class Comment extends Model {

  article () {
    return this.belongsTo('App/Models/Article')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
