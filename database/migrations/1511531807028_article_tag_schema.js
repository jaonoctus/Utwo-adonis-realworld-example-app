'use strict'

const Schema = use('Schema')

class ArticleTagSchema extends Schema {
  up () {
    this.create('article_tag', (table) => {
      table.primary(['article_id', 'tag_id'])
      table.integer('article_id').unsigned()
      table.integer('tag_id').unsigned()

      table.foreign('article_id')
        .references('articles.id')
        .onDelete('cascade')

      table.foreign('tag_id')
        .references('tags.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.dropTableIfExists('article_tag')
  }
}

module.exports = ArticleTagSchema
