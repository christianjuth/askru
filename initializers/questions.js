const bcrypt = require('bcrypt')
const {Initializer, api} = require('actionhero')
let uniqueValidator = require('mongoose-unique-validator');

module.exports = class Questions extends Initializer {
  constructor() {
    super()
    this.name = 'questions'
  }

  async initialize() {

    let mongoose = api.mongo,
      Schema = mongoose.Schema;
    let questionsSchema = mongoose.Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
      },
      advice: [{ type: Schema.Types.ObjectId, ref: 'Advice' }]
    });
    let Question = mongoose.model('Question', questionsSchema);

    api.questions = {}
    api.questions.model = Question;

    api.questions.create = async ({user, title, body}) => {
      const question = new Question();
      question.user = user;
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
        search.user = user._id;
      }

      let questions = await Question.find(search);
      return questions
      .map(({_id, title, body}) => {
        return {
          _id,
          title,
          body
        }
      });
    }

    api.questions.findOne = async ({_id}) => {
      const question = await Question.findOne({_id})
        .populate('user', 'userName')
        .populate({
          path: 'advice',
          select: 'body',
          populate: {
            path: 'user',
            select: 'userName'
          }
        });
      if(!question) throw new Error('question not found');
      return question;
    }

    api.questions.search = async ({query}) => {
      return await Question.find({$text: {$search: query}});
    }

    api.questions.delete = async (userName, password) => {}
  }

  // async start () {}
  // async stop () {}
}
