const texts = require('../texts')

/**
 * Handles LaunchRequest requests sent by Alexa when no birthdate has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */

module.exports = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder
      .speak(texts.WELCOME)
      .reprompt(texts.HELP)
      .getResponse()
  }
}