'use strict'


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
  if (!articleInstance.slug) {
    articleInstance.slug = articleInstance.title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
}
