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

function evaluateResponse(response, username, body) {
    let result
    switch(response.statusCode) {
        case 200:
            result = {
                "isError" : false,
                "data": body.sort((p1, p2) => p1.stargazers_count > p2.stargazers_count ? -1 : 1).map(p => p.name + ' ha ' + p.stargazers_count + ' stelle e ' + p.forks_count + ' forks')
            }
            break;
        case 404:
            result = {
                "isError" : true,
                "data": "Nessun progetto trovato per l'utente " + username
            }
            break;
        default:
            result = {
                "isError" : true,
                "data": "Qualcosa non ha funzionato"
            }
    }
    return result
}

const getTopProjects = (username) => new Promise((resolve, reject) => {
  request(buildOpt(username), (error, response, body) => {
      
    console.log('ERROR: ' + JSON.stringify(error));
    console.log('response: ' + JSON.stringify(response));
    console.log('body: ' + JSON.stringify(body));
    
    if (error) {
        reject(error)
        return
    }
    
    resolve (
        evaluateResponse(response, username, body)
    )
  })
})

module.exports = {
  getTopProjects
}