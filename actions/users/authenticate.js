'use strict'
const {Action, api} = require('actionhero')

module.exports = class MyAction extends Action {
 constructor () {
   super()
   this.name = 'users/authenticate'
   this.description = 'authenticate user'
   this.inputs = {
      userName: {
        required: false
      },
      password: {
        required: false
      }
    }
 }

 async run (data) {
   let {token, userName, password} = data.params;
   let headers = data.connection.rawConnection.req.headers;
   try{
     let user = await api.users.authenticate(userName, headers['x-auth-token'], password);
     data.response.authenticated = user.authenticated;
     data.response.userName = user.userName;
     data.response.userId = user.id;
     data.response.token = user.token;
   } catch(e) {
     data.response.error = e;
   }
 }
}
