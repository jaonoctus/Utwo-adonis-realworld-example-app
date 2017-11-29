'use strict'

const Comment = use('App/Models/Comment')
const Article = use('App/Models/Article')

class CommentController {
  async index({ params }) {
    const article = await Article.findByOrFail('slug', params.slug)
    const comments = await article.comments().with('author').orderBy('createdAt', 'desc').fetch()
    return { comments }
  }

  async store({ params, request, auth }) {
    const article = await Article.findByOrFail('slug', params.slug)
    const commentBody = await request.only('comment').comment
    commentBody.user_id = auth.user.id
    const comment = await article.comments().create(commentBody)
    comment.author = auth.user
    return { comment }
  }

  async destroy({ params, auth, response }) {
    const comment = await Comment.findOrFail(params.comment)
    if (comment.user_id !== auth.user.id) {
      return response.unauthorized({message: 'Can\'t delete this comment'})
    }
    await comment.delete()
    return { comment }
  }
}

module.exports = CommentController
