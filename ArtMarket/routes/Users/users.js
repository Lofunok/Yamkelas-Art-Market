'use strict';

var bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db');
const config = require('../config');
const jwt = require('../config');
const jwt = require('jsonwebtoken');

module.exports.detail = [
  passport.authenticate('jwt', {session: false}),
  (request, response) => {
    console.log('call detail -->db.users.getProfile()');
    db.users.getProfile(request.params.id, function(err, user){
      if (err) return response.json({
        'error': err
      });
      response.json(user);
    });
  }
];

module.exports.login = [
  (request, response) => {
    console.log(request.body);
    db.users.findByUsername(request.body.username, request.body.password, function(err,user){
      if(err) return response.json({
        'error': err
      });
      var hash = bcrypt.hashSync (request.body.password, user.salt);
      if (hash !== user.password) return response.json({
        message: 'username or password invalid'
      });
      console.log('generate jwt token');

      //generating jwt token
      var payload = {
        username: user.username,
        password: user.password
      };

      let token = jwt.sign(payload, config.secret,
        {
          expiresIn: '24h'// expires in 24 hours

        }
      );
      response.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    });
  }
];