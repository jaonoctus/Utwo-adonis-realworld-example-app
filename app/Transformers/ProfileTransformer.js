function profileTransform(profiles, user_id) {
  if(profiles.length) {
    profiles.map(profile => {
      profile.following = profile.followers.some(user => user.id === user_id)
      delete profile.followers
    })
    return profiles

  }
  profiles.following = profiles.followers.some(user => user.id === user_id)
  delete profiles.followers
  return profiles
}

module.exports = {profileTransform}
