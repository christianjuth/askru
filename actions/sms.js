'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'sms'
    this.description = 'SMS search'
  }

  async run(data) {
    // let {query} = data.params;
    data.response = '<Response><Message>Hello from Twilio!</Message></Response>';
  }
}
