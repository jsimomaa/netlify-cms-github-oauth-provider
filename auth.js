const randomstring = require('randomstring')

module.exports = (oauth2, oauthProvider) => {
  var options = {
    scope: process.env.SCOPES || 'repo,user',
    state: randomstring.generate(32)
  }
  // GitLab uses `redirect_uri` as query parameter name: https://docs.gitlab.com/ee/api/oauth2.html
  const propertyKey = oauthProvider === 'gitlab' ? 'redirect_uri' : 'redirectURI'
  options[propertyKey] = process.env.REDIRECT_URL

  // Authorization uri definition
  const authorizationUri = oauth2.authorizeURL(options)

  return (req, res, next) => {
    res.redirect(authorizationUri)
  }
}
