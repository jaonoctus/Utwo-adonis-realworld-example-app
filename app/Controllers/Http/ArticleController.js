'use strict'

const Article = use('App/Models/Article')
const Tag = use('App/Models/Tag')

class ArticleController {
  async index() {
    const articles = await Article.query().paginate()
    const resp = articles.toJSON()
    resp.articles = resp.data
    resp.articlesCount = resp.total
    delete resp.data
    delete resp.total
    return resp
  }

  async store({ request, auth }) {
    const articleData = request.only('article').article
    const tagList = articleData.tagList
    const tags = await this.createTagIfNotExist(tagList)
    const tagsId = tags.map(item => {
      return item.id
    })
    delete articleData.tagList
    articleData.user_id = auth.user.id
    const article = await Article.create(articleData)
    await article.tagList().attach(tagsId)
    await article.load('author')
    // await article.load('favorited')
    article.tagList = tags
    return { article: article.toJSON() }
  }

  async createTagIfNotExist(tagList) {
    const tags = []
    for (const tag of tagList) {
      tags.push(await Tag.findOrCreate({ name: tag }, { name: tag }))
    }
    return tags
  }

  async update() {
  }

  async destroy() {
  }

  async feed() {
  }
}

module.exports = ArticleController
