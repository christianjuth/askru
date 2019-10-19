var mongoose = require('mongoose');
const { Initializer, api } = require('actionhero')

module.exports = class Mongo extends Initializer {

  constructor () {
    super()
    this.name = 'mongo'
    this.loadPriority = 100
    this.startPriority = 100
    this.stopPriority = 100
  }

  async initialize () {
    this.config = api.config.mongo;
    this.uri = this.config.uri || this.generateMonogURI(this.config);
    api.mongo = mongoose;
  }

  async start () {
    api.log('MongoDB start', 'debug');
    let uri = this.uri;

    await mongoose.connect(uri, function (err) {
      if (err) {
        api.log('MongoDB fails to connect to ' + uri, 'error');
        return;
      }
      api.log('MongoDB connected to ' + uri, 'debug');
    });
  }

  async stop () {
    api.log('MongoDB teardown', 'debug');

    mongoose.disconnect(function (err) {
      if (err) {
        api.log('MongoDB disconnect failed', 'error');
        return;
      }
      api.log('MongoDB connection closed', 'debug');
    });
  }


  /**
   * Generates a mongo uri from the given object
   *
   * @param option
   * @example
   *
   * var option = {
   *   host: 'localhost',
   *   port: 27017,
   *   username: null,
   *   password: null,
   *   database: 'test'
   * }
   * generateMonogURI(options); // mongodb://localhost:27017/test
   *
   * @returns {string}
   */
  generateMonogURI(option) {
    option.host = option.host || 'localhost';
    option.port = option.port || 27017;
    option.username = option.username || '';
    option.password = option.password || '';
    option.database = option.database || 'test';

    var login = '';
    if (option.username && option.password) {
      auth = obj.username + ':' + obj.password + '@'
    }
    return 'mongodb://' + login + option.host + ':' + option.port + '/' + option.database;
  };
}
