const request = require('request')

function buildOpt(username) {
  return  {
      url: 'https://api.github.com/users/' + username + '/repos',
      headers: {
        'User-Agent': 'alexa'
      },
      json: true
    }
}

const getTopProjects = (username) => new Promise((resolve, reject) => {
  request(buildOpt(username), (error, response, body) => {
    if (error) {
      reject(error)
      return
    }
    
    console.log('BODY: ' + JSON.stringify(body));

    resolve (
        body.sort((p1, p2) => p1.stargazers_count > p2.stargazers_count ? -1 : 1)
            .map(p => p.name + ' ha ' + p.stargazers_count + ' stelle e ' + p.forks_count + ' forks')
    )
  })
})

module.exports = {
  getTopProjects
}