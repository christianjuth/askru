'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'questions/create'
    this.description = 'Create question'
    this.authenticated = true
    this.inputs = {
      title: {
        required: true
      },
      body: {
        required: true
      }
    }
  }

  async run(data) {
    let {_id} = api.user, {title, body} = data.params;

    try {
      let question = await api.questions.create({_userId: _id, title, body});
      data.response.question = {
        _id: question._id
      };
    } catch (e) {
      data.response.error = e;
    }
  }
}
