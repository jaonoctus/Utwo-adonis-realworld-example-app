const traverse = require('traverse')
const pluralize = require('pluralize')

function transformer(response, user_id) {
  return traverse(response).forEach(function (item) {
    if (this.key === 'createdAt' || this.key === 'updatedAt') {
      this.block()
    }

    if (this.key === 'followers') {
      this.update(item.some(user => user.id === user_id))
      this.key = 'following'
      this.delete()
    }
    if (this.key === 'favorites') {
      this.update(item.some(user => user.id === user_id))
      const newPath = this.path.slice(0, -1)
      newPath.push('favorited')
      this.delete()
      // response[newPath] = item
    }
    if (this.key === 'comments' || this.key === 'articles') {
      const newKey = pluralize(this.key, item.length)
      const newPath = this.path.slice(0, -1)
      newPath.push(newKey)
      this.delete()
      response[newPath] = item
    }
  });

}

module.exports = {transformer}
