'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')


Route.post('users/login', 'AuthController.login')
Route.post('users', 'AuthController.register')

Route.get('articles', 'ArticleController.index')

Route.get('tags', 'TagController.index')

Route.group(() => {

  Route.post('articles', 'ArticleController.store')
  Route.put('articles/:article', 'ArticleController.update')
  Route.delete('articles/:article', 'ArticleController.destroy')

  Route.get('articles/feed', 'ArticleController.feed')
  Route.post('articles/:article/favorite', 'FavoriteController.store')
  Route.delete('articles/:article/favorite', 'FavoriteController.destroy')

  Route.get('user', 'UserController.index')
  Route.put('user', 'UserController.update')

  Route.get('profiles/:user', 'ProfileController.show')
  Route.post('profiles/:user/follow', 'ProfileController.follow')
  Route.delete('profiles/:user/follow', 'ProfileController.unfollow')

  Route.get('articles/:article/comments', 'CommentController.index')
  Route.post('articles/:article/comments', 'CommentController.store')
  Route.delete('articles/:article/comments/:comment', 'CommentController.destroy')
}).middleware('auth')
