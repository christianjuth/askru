'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'sms'
    this.description = 'SMS search'
  }

  async run(data) {
    let {Body, From} = data.connection.params;

    let results = await api.questions.searchWithAdvice({query: Body});

    let advice = 'honk!';
    for(let i = 0; i < results.length; i++) {
      if(results[i] && results[i].advice.length > 0) {
        advice = results[i].advice.map((obj, i) => `${i+1}. ${obj.body}`).join('\n');
        break;
      }
    }


    await api.twilio.send({
      to: From,
      message: advice
    });

    data.response = '';
  }
}
