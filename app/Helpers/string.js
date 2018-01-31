const pluralize = require('pluralize')

function uppercaseFirst(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function pluralizeResponse(response) {
  const key = Object.keys(response)[0];
  const newKey = pluralize(key, response[key].length)
  response[newKey] = response[key]
  delete response[key]
  return response
}

module.exports = {uppercaseFirst, pluralizeResponse}
