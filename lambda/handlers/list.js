const Alexa = require('ask-sdk-core');
const githubApi = require('../api/github')
const texts = require('../texts')

const MAX_PROJECTS = 5

module.exports = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RetrieveUserRepoIntent';
  },
  handle(handlerInput) {
    const username = Alexa.getSlotValue(handlerInput.requestEnvelope, 'username');
      
    return githubApi.getTopProjects(username).then(result => {
         
        let message = result.data
        if (!result.isError) {
            const titlesText = result.data
                                .slice(0, MAX_PROJECTS)
                                .map(projectDescription => `<p>${projectDescription}</p>`)
                                .join(' ')

            message = `<speak><p>${texts.LAST_TITLE_INTRODUCTION} ${username}</p> ${titlesText}</speak>`
        }
    
      return handlerInput.responseBuilder
        .speak(message)
        .reprompt(texts.HELP)
        .getResponse()
    })
  }
}