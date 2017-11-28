'use strict'

const Article = use('App/Models/Article')
const ArticleController = use('App/Controllers/Http/ArticleController')

class FavoriteController {

  async store ({auth, params}) {
    const article = await Article.findByOrFail('slug', params.slug)
    await article.favorites().attach([auth.user.id])
    const articleController = new ArticleController()
    return articleController.find({params})
  }

  async destroy ({auth, params}) {
    const article = await Article.findByOrFail('slug', params.slug)
    await article.favorites().detach([auth.user.id])
    const articleController = new ArticleController()
    return articleController.find({params})
  }
}

module.exports = FavoriteController
