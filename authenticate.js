var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');


var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

//this basically takes the user information.
// Now recall that the passport authenticate will mount the req.user or
// the user property to the request message and so that user information
// will be serialized and deserialized realized by using this saying serialize user 
//and passport deserialize user.

//Passport.serialize ve passport.deserialize,
// kimliği kullanıcının tarayıcısında çerez olarak ayarlamak 
//ve daha sonra geri aramada kullanıcı bilgilerini almak için 
//kullanıldığında çerezden kimliği almak için kullanılır

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));