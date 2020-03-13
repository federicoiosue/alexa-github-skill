const Alexa = require('ask-sdk-core');
const texts = require('../texts')

/**
 * Handles AMAZON.HelpIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.HelpIntent intent defined in your intent schema.
 */
module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(texts.HELP)
            .reprompt(texts.HELP)
            .getResponse();
    }
};