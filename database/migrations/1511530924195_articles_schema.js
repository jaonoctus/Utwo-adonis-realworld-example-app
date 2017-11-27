'use strict'

const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('slug').unique().notNullable()
      table.string('title').notNullable()
      table.string('description')
      table.text('body')
      table.timestamp('createdAt').defaultTo(this.fn.now())
      table.timestamp('updatedAt').defaultTo(this.fn.now())

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
