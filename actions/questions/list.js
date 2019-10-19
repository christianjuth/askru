'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'questions/list'
    this.description = 'List questions'
    this.inputs = {
      userName: {}
    }
  }

  async run(data) {
    let {userName} = data.params;
    data.response.questions = await api.questions.list({userName});
  }
}
