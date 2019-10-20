const bcrypt = require('bcrypt')
const {Initializer, api} = require('actionhero')
const twilio = require('twilio');

module.exports = class Twilio extends Initializer {
  constructor() {
    super()
    this.name = 'twilio'
  }

  async initialize() {
    
    //
    // client.messages.create({
    //   body: 'Hello from Node',
    //   to: '+19088015484',  // Text this number
    //   from: '+17325851946' // From a valid Twilio number
    // })
    // .then((message) => console.log(message.sid));

  }

  // async start () {}
  // async stop () {}
}
