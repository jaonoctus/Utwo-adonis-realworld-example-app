'use strict'

const { test, trait } = use('Test/Suite')('Model User')
const Model = use('Model')
const HasMany = use('@adonisjs/lucid/src/Lucid/Relations/HasMany')
const BelongsToMany = use('@adonisjs/lucid/src/Lucid/Relations/BelongsToMany')
const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const Article = use('App/Models/Article')

trait(({ Context }) => {
  const user = new User()

  Context.getter('user', () => user)

  Context.macro('relatedTest', (assert, method, relationship, relatedModel, relation = null) => {
    assert.isFunction(user[method])
    assert.instanceOf(user[method](), relationship)
    assert.instanceOf(new (user[method]().RelatedModel)(), relatedModel)

    if (relation !== null) {
      const { foreignKey, pivot, relatedForeignKey } = user[method]().relatedQuery.$relation
      const [relationForeignKey, relationPivotTable, relationRelatedForeignKey] = relation

      assert.equal(foreignKey, relationForeignKey)
      assert.equal(relatedForeignKey, relationPivotTable)
      assert.equal(pivot.table, relationRelatedForeignKey)
    }
  })
})

test('Should be a Lucid Model', ({ assert, user }) => {
  assert.instanceOf(user, Model)
})

test('Should have HasMany relationship with Comment (comments)', ({ assert, relatedTest }) => {
  relatedTest(assert, 'comments', HasMany, Comment)
})

test('Should have BelongsToMany relationship with Article (favorite)', ({ assert, relatedTest }) => {
  relatedTest(assert, 'favorite', BelongsToMany, Article)
})

test('Should have BelongsToMany relationship with User (following)', ({ assert, relatedTest }) => {
  relatedTest(assert, 'following', BelongsToMany, User, ['follower_id', 'followed_id', 'follows'])
})

test('Should have BelongsToMany relationship with User (followers)', ({ assert, relatedTest }) => {
  relatedTest(assert, 'followers', BelongsToMany, User, ['followed_id', 'follower_id', 'follows'])
})
