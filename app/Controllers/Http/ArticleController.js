'use strict'
const {uppercaseFirst} = require('../../Helpers/string');

const Article = use('App/Models/Article')
const Tag = use('App/Models/Tag')

class ArticleController {
  async index({request, auth}) {
    const articleQuery = this.filterByQueryString(request, Article.query())
    let articles = await articleQuery.orderBy('createdAt', 'desc').paginate()
    articles = await articles.toJSON()
    this.addFavoritedAttribute(articles.data, auth.user.id)
    return this.transformResponse(articles)
  }

  async feed({auth}) {
    let articles = await Article.query().followersArticle(auth.user.id).orderBy('createdAt', 'desc').paginate()
    articles = await articles.toJSON()
    articles = this.addFavoritedAttribute(articles.data, auth.user.id)
    return this.transformResponse(articles)
  }

  addFavoritedAttribute(articles, user_id) {
    articles.map(article => {
      article.favorited = this.isFavoritedAttribute(article, user_id)
      delete article.favorites
    })
    return articles
  }

  isFavoritedAttribute(article, user_id) {
    return article.favorites.some((user) => {
      return user.id === user_id
    })
  }

  transformResponse(articleResponse) {
    if (articleResponse.data.length < 2) {
      return {article: articleResponse.data}
    }
    articleResponse.articles = articleResponse.data
    articleResponse.articlesCount = articleResponse.total
    delete articleResponse.data
    delete articleResponse.total
    return articleResponse
  }

  filterByQueryString(request, query) {
    const queryParams = request.get()
    for (const queryParam of Object.entries(queryParams)) {
      const methodName = uppercaseFirst(queryParam[0])
      const func = `filterBy${methodName}`
      query[func](queryParam[1])
    }
    return query
  }

  async find({params}) {
    return this.findArticleBySlug(params.slug)
  }

  async findArticleBySlug(slug) {
    let article = await Article.findByOrFail('slug', slug)
    return {article}
  }

  async store({request, auth}) {
    const articleData = request.only('article').article
    const tagList = articleData.tagList
    delete articleData.tagList
    articleData.user_id = auth.user.id
    const article = await Article.create(articleData)
    if (tagList) {
      await this.createTagIfNotExist(tagList, article)
    }
    return this.findArticleBySlug(article.slug)
  }

  async createTagIfNotExist(tagList, article) {
    const tagsId = []
    for (const tagName of tagList) {
      const tag = await Tag.findOrCreate({name: tagName}, {name: tagName})
      tagsId.push(tag.id)
    }
    return await article.tagList().attach(tagsId)
  }

  async update({params, auth, request, response}) {
    const article = await Article.findByOrFail('slug', params.slug)
    if (article.user_id !== auth.user.id) {
      return response.unauthorized({message: 'Can\'t update this article'})
    }
    const {title, description, body} = request.only('article').article
    article.merge({title, description, body})
    await article.save()
    return this.findArticleBySlug(article.slug)
  }

  async destroy({params, auth, response}) {
    const article = await Article.findByOrFail('slug', params.slug)
    if (article.user_id !== auth.user.id) {
      return response.unauthorized({message: 'Can\'t delete this article'})
    }
    await article.delete()
    return {article}
  }
}

module.exports = ArticleController
