'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'questions/oneById'
    this.description = 'Get single question by id'
    this.inputs = {
      _id: {
        required: true
      }
    }
  }

  async run(data) {
    let {_id} = data.params;
    data.response.question = await api.questions.findOne({_id});
  }
}
