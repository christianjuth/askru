exports['default'] = {
  mongo: (api) => {
    return {
      uri: process.env.MONGO_URI || '',
      host: process.env.MONGO_HOSE || 'localhost',
      port: process.env.MONGO_PORT || 27017,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      database: 'actionhero_auth'
    }
  }
}
