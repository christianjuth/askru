'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'questions/search'
    this.description = 'List questions'
    this.inputs = {
      query: {
        required: true
      }
    }
  }

  async run(data) {
    let {query} = data.params;
    data.response.questions = await api.questions.search({query});
  }
}
