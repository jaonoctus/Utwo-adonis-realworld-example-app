'use strict'

const Model = use('Model')

class Article extends Model {
  static boot() {
    super.boot();
    this.addGlobalScope(builder => {
      builder.with('favorited');
      builder.with('tagList');
      builder.with('author');
    });
    this.addHook('beforeCreate', 'Article.slugify')
  }

  static get computed() {
    return ['favoritesCount']
  }

  getFavoritesCount({ favorited }) {
    if(this.$relations.favorited) {
      return this.$relations.favorited.toJSON().length
    }
  }

  static get createdAtColumn() {
    return 'createdAt'
  }

  static get updatedAtColumn() {
    return 'updatedAt'
  }

  static formatDates(field, value) {
    return value
  }

  static castDates(field, value) {
    return value
  }

  author() {
    return this.belongsTo('App/Models/User')
  }

  comments() {
    return this.hasMany('App/Models/Comment')
  }

  tagList() {
    return this.belongsToMany('App/Models/Tag')
  }

  favorited() {
    return this.belongsToMany('App/Models/User')
      .pivotTable('favorites')
  }

}

module.exports = Article
