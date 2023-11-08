'use strict';

const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../db');
const config = require('../config');
var opts = {}

opts.jwtFromRequest = ExtractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done)
{
    db.users.findById(jwt_payload.id, function(err, user)
    {
        if(err){
            return done(err, false);
        }
        if (user)
        {
            return done(null, user);
        } else {
            return done(null,false);
        }
    });
}));

