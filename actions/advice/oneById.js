'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
  constructor() {
    super()
    this.name = 'advice/oneById'
    this.description = 'Get single advice by id'
    this.inputs = {
      _id: {
        required: true
      }
    }
  }

  async run(data) {
    let {_id} = data.params;
    data.response.advice = await api.advice.findOne({_id});
  }
}
