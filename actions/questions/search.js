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
    let results = await api.questions.searchWithAdvice({query});


    let advice = 'honk!';
    if(results[0]) {
      advice = results[0].advice.map(obj => obj.body).join('\n')
    }
    console.log(advice);


    data.response.questions = await api.questions.search({query});
  }
}
