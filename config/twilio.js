exports['default'] = {
  twilio: (api) => {
    return {
      sid: process.env.TWILIO_SID,
      token: process.env.TWILIO_TOKEN,
      from: '+17325851946'
    }
  }
}
