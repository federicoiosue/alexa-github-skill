// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

/////////////////////////////////
// Modules Definition
/////////////////////////////////

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./languageStrings');


const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
 
const LaunchRequestHandler = require('./handlers/launch')
const HelpIntentHandler = require('./handlers/help')
const ListIntentHandler = require('./handlers/list')
const CancelIntentHandler = require('./handlers/cancel')
const ExitIntentHandler = require('./handlers/exit')

module.exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler)
  .addRequestHandlers(HelpIntentHandler)
  .addRequestHandlers(CancelIntentHandler)
  .addRequestHandlers(ListIntentHandler)
  .addRequestHandlers(ExitIntentHandler)
  .lambda();