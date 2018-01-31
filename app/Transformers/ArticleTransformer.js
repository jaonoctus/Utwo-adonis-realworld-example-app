function addFavoritedAttribute(articles, user_id) {
  articles.map(article => {
    article.favorited = this.isFavoritedAttribute(article, user_id)
    delete article.favorites
  })
  return articles
}

function isFavoritedAttribute(article, user_id) {
  return article.favorites.some((user) => {
    return user.id === user_id
  })
}

module.exports = {addFavoritedAttribute}
