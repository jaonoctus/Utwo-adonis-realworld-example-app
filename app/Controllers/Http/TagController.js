'use strict'

const Tag = use('App/Models/Tag')

class TagController {
  async index() {
    const tags = await Tag.all()
    return {tags}
  }
}

module.exports = TagController
