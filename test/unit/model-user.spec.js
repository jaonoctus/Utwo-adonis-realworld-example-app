'use strict'

const { test, trait } = use('Test/Suite')('Model User')
const Model = use('Model')
const HasMany = use('@adonisjs/lucid/src/Lucid/Relations/HasMany')
const BelongsToMany = use('@adonisjs/lucid/src/Lucid/Relations/BelongsToMany')
const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const Article = use('App/Models/Article')

trait(({ Context }) => {
  Context.getter('user', () => new User())
})

test('Should be a Lucid Model', ({ assert, user }) => {
  assert.instanceOf(user, Model)
})

test('Should have HasMany relationship with Comment (comments)', ({ assert, user }) => {
  assert.isFunction(user.comments)
  assert.instanceOf(user.comments(), HasMany)
  assert.instanceOf(new (user.comments().RelatedModel)(), Comment)
})

test('Should have BelongsToMany relationship with Article (favorite)', ({ assert, user }) => {
  assert.isFunction(user.favorite)
  assert.instanceOf(user.favorite(), BelongsToMany)
  assert.instanceOf(new (user.favorite().RelatedModel)(), Article)
})

test('Should have BelongsToMany relationship with User (following)', ({ assert, user }) => {
  assert.isFunction(user.following)
  assert.instanceOf(user.following(), BelongsToMany)
  assert.instanceOf(new (user.following().RelatedModel)(), User)

  const { foreignKey, pivot, relatedForeignKey } = user.following().relatedQuery.$relation

  assert.equal(foreignKey, 'follower_id')
  assert.equal(relatedForeignKey, 'followed_id')
  assert.equal(pivot.table, 'follows')
})

test('Should have BelongsToMany relationship with User (followers)', ({ assert, user }) => {
  assert.isFunction(user.followers)
  assert.instanceOf(user.followers(), BelongsToMany)
  assert.instanceOf(new (user.followers().RelatedModel)(), User)

  const { foreignKey, pivot, relatedForeignKey } = user.followers().relatedQuery.$relation

  assert.equal(foreignKey, 'followed_id')
  assert.equal(relatedForeignKey, 'follower_id')
  assert.equal(pivot.table, 'follows')
})
