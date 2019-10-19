exports['default'] = {
  mongo: (api) => {
    return {
      uri: process.env.MONGO_URI || '',
      host: 'localhost',
      port: 27017,
      username: null,
      password: null,
      database: 'actionhero_auth'
    }
  }
}
