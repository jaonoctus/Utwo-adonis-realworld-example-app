'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('bio')
      table.string('image', 2048)
      table.timestamp('createdAt').defaultTo(this.fn.now())
      table.timestamp('updatedAt').defaultTo(this.fn.now())
    })
  }

  down () {
    this.dropTableIfExists('users')
  }
}

module.exports = UserSchema
