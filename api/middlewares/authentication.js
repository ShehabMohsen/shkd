const bcrypt = require("bcryptjs"); // to check password
const passport = require("passport"); // package for managing user session

// localStrategy is our means of logging in. There are github/twitter/google strategy
const LocalStrategy = require("passport-local"); // package for managing email and password

const { User } = require("../models") // to query the database

// compares user submitted password with stored hashed password from the database.
function passwordsMatch(submittedPassword, storedPasswordHash) {
  return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

/*
  The following code runs at login time.
  The usernameField and passwordField options refer to the HTTP requests
  body parameter names. I've set this to look for an `email` parameter,
  but you may prefer to use a `username` parameter instead of an email.
  BEST PRACTICE: don't state why login failed to the user.
*/

// passport.use is a method that takes an object LocalStrategy
passport.use(
  new LocalStrategy( //local strategy takes in two parameters
    // 1. receives user information as an object
    {
      usernameField: "email",
      passwordField: "password",
    },
    // 2. callback function that determines if a user exists with provided email, and if the password provided matches w/stored password
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          // user does not exist with provided email
          if (!user) {
            console.log("\n\nFailed Login: user does not exist\n\n"); // console.log for testing purposes
            return done(null, false, { message: "Failed Login" }); // message provided to the user
          }
          // provided password is incorrect
          if (passwordsMatch(password, user.passwordHash) === false) {
            console.log("\n\nFailed Login: passwords did not match\n\n");
            return done(null, false, { message: "Failed Login" });
          }
          // returns user object by passing it as second parameter inside 'done' callback function
          console.log("\n\nSuccessful Login\n\n");
          return done(null, user, { message: "Successfully Logged In!" });
        })
        .catch((err) => {
          return done(err); // if there's some other error (i.e. database table does not exist, etc...)
        });
    }
  )
);

// makes session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// for session persistance, this will relogin the user
passport.deserializeUser((id, done) => {
  User.findByPk(id) //use the cookie to find the user by id from the database and log us in
    .then((user) => {
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
      return;
    })
    .catch((err) => done(err, null));
});

passport.isAuthenticated = () => (req, res, next) =>
  req.user ? next() : res.sendStatus(401);

module.exports = passport;
