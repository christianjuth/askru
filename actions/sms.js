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

    let advice = 'honk';
    if(results[0]) {
      advice = results[0].advice.map((obj, i) => `${i+1}. ${obj.body}`).join('\n');
    }

    await api.twilio.send({
      to: From,
      message: advice
    });

    data.response = '';
  }
}
