const traverse = require('traverse')
const pluralize = require('pluralize')

function transformer(response, user_id) {
  return traverse(response).forEach(function (item) {
    if(typeof item === 'object') {
      try {
        const newItem = item.toJSON()
        this.update(newItem)
      } catch (e) {}
    }
    if (this.key === 'createdAt' || this.key === 'updatedAt') {
      this.block()
    }

    if (this.key === 'followers') {
      if (this.parent.node.id !== user_id) {
        const newItem = item.some(user => user.id === user_id)
        addKey.call(this, 'following', newItem, response);
      }
      this.delete()
    }

    if (this.key === 'favorites') {
      const newItem = item.some(user => user.id === user_id)
      changeKey.call(this, 'favorited', newItem, response);
    }

    if (this.key === 'comments' || this.key === 'articles') {
      const newKey = pluralize(this.key, item.length)
      changeKey.call(this, newKey, item, response);
    }
  });

}

function addKey(newKey, item, response) {
  const newPath = this.path.slice(0, -1)
  for (const path of newPath) {
    response = response[path]
  }
  response[newKey] = item
}

function changeKey(newKey, item, response) {
  addKey.call(this, newKey, item, response)
  if(newKey !== this.key) {
    this.delete()
  }
}

module.exports = {transformer}
