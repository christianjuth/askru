'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'sms'
    this.description = 'SMS search'
  }

  async run({response}) {
    console.log(data.params);
    response.send('<Response><Message>Hello from Twilio!</Message></Response>');
  }
}
