const bcrypt = require('bcrypt')
const { Initializer, api } = require('actionhero')
let uniqueValidator = require('mongoose-unique-validator');
let jwt = require('jsonwebtoken');



module.exports = class Users extends Initializer {
  constructor () {
    super()
    this.name = 'users'
    this.saltRounds = 10
    this.secret = 'secret'
    this.usersHash = 'users'
  }

  async initialize () {

    let mongoose = api.mongo;
    let userSchema = mongoose.Schema({
        userName: {
          type: String,
          required: true,
          unique: true
        },
        hashedPassword: {
          type: String,
          required: true
        },
        passwordUpdatedAt: {
          type: Date,
          required: true
        },
        token: {
          type: String
        }
    });
    userSchema.plugin(uniqueValidator);
    let Users = mongoose.model('Users', userSchema);


    api.users = {}
    api.users.create = async (userName, password) => {
      const hashedPassword = await api.users.cryptPassword(password)
      const user = new Users();
      user.userName = userName;
      user.hashedPassword = hashedPassword;
      user.passwordUpdatedAt = new Date();
      await user.save();
    }

    api.users.update = async (userName, password) => {
      // await user.save();
    }

    api.users.list = async () => {
      let users = await Users.find();
      return users.map(user => {
        return {
          _id: user._id,
          userName: user.userName
        };
      });
    }

    api.users.authenticate = async (userName, token, password) => {
      let generateToken = (user) => {
        return jwt.sign({
          id: user._id
        }, this.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
      }

      let decodeToken = (token) => {
        return jwt.verify(token, this.secret);
      }

      try {
        // try authentication by token
        if(token){
          let data = decodeToken(token),
              user = await Users.findOne({_id: data.id}),
              pswdOlderThanToken = new Date(data.iat*1000) > user.passwordUpdatedAt;

          if(user && pswdOlderThanToken) {
            api.user = user;
            return {
              authenticated: true,
              token: token,
              userName: user.userName,
              id: user._id
            }
          }
        }

        // try authentication by password
        let user = await Users.findOne({userName: userName});
        let authenticated = await api.users.comparePassword(user.hashedPassword, password);
        if(authenticated){
          api.username = user.userName;
          return {
            authenticated: true,
            token: generateToken(user),
            id: user._id,
            userName: user.userName
          }
        } else{
          throw new Error();
        }

      } catch (error) {
        throw new Error(`incorrect username or password`);
      }
    }

    api.users.delete = async (userName, password) => {
    }

    api.users.cryptPassword = async (password) => {
      return bcrypt.hash(password, this.saltRounds)
    }

    api.users.comparePassword = async (hashedPassword, userPassword) => {
      return bcrypt.compare(userPassword, hashedPassword)
    }
  }

  // async start () {}
  // async stop () {}
}
