var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));

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