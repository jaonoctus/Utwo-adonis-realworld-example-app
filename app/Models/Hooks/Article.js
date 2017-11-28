'use strict'

const { sanitizor } = use('Validator')

const ArticleHook = module.exports = {}

/**
 * Slugify article title
 *
 * @method
 *
 * @param  {Object} articleInstance
 *
 * @return {void}
 */
ArticleHook.slugify = async (articleInstance) => {
  if (!articleInstance.slug || articleInstance.title) {
    articleInstance.slug = sanitizor.slug(articleInstance.title) + '_' + Math.random().toString(36).substr(2, 6);
  }
}
