'use strict'
const {Action, api} = require('actionhero')

module.exports = class CreateAdvice extends Action {
  constructor() {
    super()
    this.name = 'advice/create'
    this.description = 'Create advice'
    this.authenticated = true
    this.inputs = {
      _questionId: {
        required: true
      },
      body: {
        required: true
      }
    }
  }

  async run(data) {
    let {_id} = api.user, {_questionId, body} = data.params;

    try {
      let advice = await api.advice.create({user: _id, _questionId, body});
      data.response.advice = advice;
    } catch (e) {
      data.response.error = e;
    }
  }
}
