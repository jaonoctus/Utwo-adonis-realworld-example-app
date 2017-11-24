'use strict'

const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('slug').unique()
      table.string('title').notNullable()
      table.string('description')
      table.text('body')
      table.timestamps()

      table.foreign('user_id')
        .references('users.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.dropTableIfExists('articles')
  }
}

module.exports = ArticlesSchema
