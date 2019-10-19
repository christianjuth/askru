const bcrypt = require('bcrypt')
const {Initializer, api} = require('actionhero')
let uniqueValidator = require('mongoose-unique-validator');
let jwt = require('jsonwebtoken');

module.exports = class Questions extends Initializer {
  constructor() {
    super()
    this.name = 'questions'
  }

  async initialize() {

    let mongoose = api.mongo,
      Schema = mongoose.Schema;
    let questionsSchema = mongoose.Schema({
      _userId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      title: {
        type: String,
        index: 'text',
        required: true
      },
      body: {
        type: String,
        index: 'text',
        required: true
      }
    });
    let Question = mongoose.model('Questions', questionsSchema);

    api.questions = {}
    api.questions.create = async ({_userId, title, body}) => {
      const question = new Question();
      question._userId = _userId;
      question.title = title;
      question.body = body;
      return await question.save();
    }

    api.questions.update = async () => {
      // await user.save();
    }

    api.questions.list = async ({userName}) => {
      let search = {};

      if(userName) {
        let user = await api.users.findOne({userName});
        search._userId = user._id;
      }

      let questions = await Question.find(search);
      return questions.map(question => {
        return {_id: question._id, title: question.title, body: question.body};
      });
    }

    api.questions.search = async ({query}) => {
      return await Question.find({$text: {$search: query}});
    }

    api.questions.delete = async (userName, password) => {}
  }

  // async start () {}
  // async stop () {}
}
