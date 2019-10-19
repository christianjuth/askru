const {Initializer, api} = require('actionhero')

module.exports = class AuthenticationMidleware extends Initializer {
  constructor() {
    super()
    this.name = 'authentication_middleware'
  }

  async initialize() {
    const middleware = {
      name: this.name,
      global: true,
      preProcessor: async ({actionTemplate, params, connection}) => {
        let headers = connection.rawConnection.req.headers;
        if (actionTemplate.authenticated === true) {
          let authenticated = (await api.users.authenticate(params.userName, headers['x-auth-token'])).authenticated;
          if (authenticated == false) {
            throw Error('Authentication Failed.  userName and password required')
          }
        }
      }
    }

    api.actions.addMiddleware(middleware)
  }

  // async start () {}
  // async stop () {}
}
