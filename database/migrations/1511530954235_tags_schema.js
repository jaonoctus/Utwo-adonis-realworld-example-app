'use strict'

const Schema = use('Schema')

class TagsSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
    })
  }

  down () {
    this.dropTableIfExists('tags')
  }
}

module.exports = TagsSchema
