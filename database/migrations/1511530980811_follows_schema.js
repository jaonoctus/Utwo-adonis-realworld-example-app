'use strict'

const Schema = use('Schema')

class FollowsSchema extends Schema {
  up () {
    this.create('follows', (table) => {
      table.primary(['follower_id', 'followed_id'])
      table.integer('follower_id').unsigned()
      table.integer('followed_id').unsigned()
      table.timestamp('createdAt').defaultTo(this.fn.now())
      table.timestamp('updatedAt').defaultTo(this.fn.now())

      table.foreign('follower_id')
        .references('users.id')
        .onDelete('cascade')

      table.foreign('followed_id')
        .references('users.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.dropTableIfExists('follows')
  }
}

module.exports = FollowsSchema
