const bcrypt = require('bcrypt')
const {Initializer, api} = require('actionhero')
const twilio = require('twilio');

module.exports = class Twilio extends Initializer {
  constructor() {
    super()
    this.name = 'twilio'
  }

  async initialize() {
    this.config = api.config.twilio;
    let client;
    if(this.config.sid) {
      client = new twilio(this.config.sid, this.config.token);
    }

    api.twilio = {};
    api.twilio.send = async ({to, message}) => {
      if(!client) return;
      await client.messages.create({
        to,
        body: message,
        from: this.config.from
      })
    }
  }

  // async start () {}
  // async stop () {}
}
