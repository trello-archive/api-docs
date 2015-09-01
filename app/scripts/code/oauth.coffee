http = require('http')
OAuth = require('oauth').OAuth
url = require('url')

#run locally on a port that probably isn't taken
domain = "127.0.0.1"
port = 6080

requestURL = "https://trello.com/1/OAuthGetRequestToken"
accessURL = "https://trello.com/1/OAuthGetAccessToken"
authorizeURL = "https://trello.com/1/OAuthAuthorizeToken"
appName = "Trello OAuth Example"

#replace these with your application key/secret
key = "YOURKEY"
secret = "YOURSECRET"

#Trello redirects the user here after authentication
loginCallback = "http://#{domain}:#{port}/cb"

#need to store token: tokenSecret pairs; in a real application, this should be more permanent (redis would be a good choice)
oauth_secrets = {}

oauth = new OAuth(requestURL, accessURL, key, secret, "1.0", loginCallback, "HMAC-SHA1")

login = (req, res) ->
  oauth.getOAuthRequestToken (error, token, tokenSecret, results) =>
    oauth_secrets[token] = tokenSecret
    res.writeHead(302, { 'Location': "#{authorizeURL}?oauth_token=#{token}&name=#{appName}" })
    res.end()

cb = (req, res) ->
  query = url.parse(req.url, true).query

  token = query.oauth_token
  tokenSecret = oauth_secrets[token]
  verifier = query.oauth_verifier

  oauth.getOAuthAccessToken token, tokenSecret, verifier, (error, accessToken, accessTokenSecret, results) ->
    #in a real app, the accessToken and accessTokenSecret should be stored
    oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, (error, data, response) ->
      #respond with data to show that we now have access to your data
      res.end(data)
    )

http.createServer( (req, res) ->
  if /^\/login/.test(req.url)
    login(req, res)
  else if /^\/cb/.test(req.url)
    cb(req, res)
  else
    res.end("Don't know about that")
).listen(port, domain)

console.log "Server running at #{domain}:#{port}; hit #{domain}:#{port}/login"