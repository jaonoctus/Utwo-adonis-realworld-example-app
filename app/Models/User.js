'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  comments ()
  {
    return this.hasMany('App/Models/Comment')
  }

  favorite () {
    return this.belongsToMany('App/Models/Article')
  }

}

module.exports = User
