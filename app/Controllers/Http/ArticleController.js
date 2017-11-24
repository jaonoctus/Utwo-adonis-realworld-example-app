'use strict'

const Article = use('App/Models/Article')
const Tag = use('App/Models/Tag')

class ArticleController {
  async index () {
    const article = await Article.all()
    return {article}
  }

  async store ({request, auth}) {
    const articleData = request.only('article').article
    const tagList = articleData.tagList
    let tags = tagList.map(item => {
      return {name: item}
    })
    // tags = await Tag.createMany(tags)
    delete articleData.tagList
    const article = await Article.create(articleData)
    return {article}
  }

  async update () {
  }

  async destroy () {
  }

  async feed () {
  }
}

module.exports = ArticleController
