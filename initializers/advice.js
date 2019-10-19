const bcrypt = require('bcrypt')
const {Initializer, api} = require('actionhero')
let uniqueValidator = require('mongoose-unique-validator');

module.exports = class Advice extends Initializer {
  constructor() {
    super()
    this.name = 'advice'
  }

  async initialize() {

    let mongoose = api.mongo,
      Schema = mongoose.Schema;
    let adviceSchema = mongoose.Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      body: {
        type: String,
        index: 'text',
        required: true
      }
    });
    let Advice = mongoose.model('Advice', adviceSchema);

    api.advice = {}
    api.advice.create = async ({user, _questionId, body}) => {
      const question = await api.questions.model.findOne({_id: _questionId});
      if (!question)
        throw new Error('question not found');
      const advice = new Advice();
      advice.user = user;
      advice.question = question._id;
      advice.body = body;
      await advice.save();
      question.advice.push(advice);
      question.save();
      return advice;
    }

    api.advice.findOne = async (search) => {
      let advice = await Advice.findOne(search)
        .populate('user', 'userName')
        .populate('question', '_id');
      if (!advice)
        throw new Error('advice not found');
      return advice;
    }
  }

  // async start () {}
  // async stop () {}
}
