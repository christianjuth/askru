'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'users/create'
    this.description = 'Create user'
    this.inputs = {
      userName: {
        required: true
      },
      password: {
        required: true
      }
    }
  }

  async run(data) {
    let {userName, password} = data.params;
    try {
      await api.users.create(userName, password);
    } catch (e) {
      data.response.error = e;
    }
  }
}
