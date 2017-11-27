'use strict'

const Comment = use('App/Models/Comment')
const Article = use('App/Models/Article')

class CommentController {
  async index({ params }) {
    const article = await Article.findByOrFail('slug', params.article)
    const comments = await article.comments().with('author').fetch()
    return { comments: comments.toJSON() }
  }

  async store({ params, request, auth }) {
    const article = await Article.findByOrFail('slug', params.article)
    const commentBody = await request.only('comment').comment
    commentBody.user_id = auth.user.id
    const comment = await article.comments().create(commentBody)
    comment.author = auth.user
    return { comment: comment.toJSON() }
  }

  async destroy({ params, auth, response }) {
    const comment = await Comment.findOrFail(params.comment)
    if (comment.user_id === auth.user.id) {
      await comment.delete()
      return { comment: comment.toJSON() }
    } else {
      response.json({message: 'Can\'t delete this comment'})
    }
  }
}

module.exports = CommentController
