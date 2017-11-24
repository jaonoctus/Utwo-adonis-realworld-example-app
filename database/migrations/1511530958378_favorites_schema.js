'use strict'

const Schema = use('Schema')

class FavoriteSchema extends Schema {
  up () {
    this.create('favorites', (table) => {
      table.primary(['user_id', 'article_id'])
      table.integer('user_id').unsigned()
      table.integer('article_id').unsigned()
      table.timestamps()

      table.foreign('user_id')
        .references('users.id')
        .onDelete('cascade')

      table.foreign('article_id')
        .references('articles.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.dropTableIfExists('favorites')
  }
}

module.exports = FavoriteSchema
