'use strict'

const Model = use('Model')

class Article extends Model {


  user () {
    return this.belongsTo('App/Models/User')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }

  tags () {
    return this.belongsToMany('App/Models/Tag')
  }

  favorite () {
    return this.belongsToMany('App/Models/User')
  }

}

module.exports = Article
