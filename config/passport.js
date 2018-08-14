const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load User Model
const User = mongoose.model('users');

// module.exports = function(passport){
// 	passport.use(new GoogleStrategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: "/auth/google/callback",
//     proxy: true
//   },
//   function(accessToken, refreshToken, profile, done) {
//     //console.log(accessToken);
//     //console.log(profile);
//     const image = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
//     //console.log(image)
//     const newUser = {
//       googleId : profile.id,
//       email : profile.emails[0].value,
//       firstName: profile.name.givename,
//       lastName: profile.name.familyName,
//       image : image
//     }

//     //Check For Existing User
//     User.findOne({
//       googleId : profile.id
//     }).then(user => {
//        if(user){
//          done(null , user);
//        }else{
//          //Create User
//          new User(newUser)
//              .save()
//              .then(user => done(null,user));
//        }
//     })
//   }
//  ));

//  passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
// }

module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret:keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      //console.log(profile);

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      // Check for existing user
      User.findOne({
        googleID: profile.id
      }).then(user => {
        if(user){
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })
  )

   passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}

