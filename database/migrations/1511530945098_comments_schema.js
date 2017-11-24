'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('article_id').unsigned()
      table.text('body').notNullable()
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
    this.dropTableIfExists('comments')
  }
}

module.exports = CommentsSchema
