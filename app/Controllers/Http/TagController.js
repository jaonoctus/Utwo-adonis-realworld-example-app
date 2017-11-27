'use strict'

const Tag = use('App/Models/Tag')

class TagController {
  async index() {
    const tag = await Tag.all()
    return { tags: tag.toJSON() }
  }
}

module.exports = TagController
