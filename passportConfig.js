const { response } = require("express");
const db = require("./server/db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((userName, password, done) => {
      const query = "SELECT * FROM project2.users WHERE userName=?";
      db.query(query, [userName], (err, rows) => {
        if (err) {
          throw err;
        }
        if (rows.length === 0) {
          return done(null, false);
        }
        bcrypt.compare(password, rows[0].password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, rows[0]);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
};
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM project2.users WHERE id=?";
  db.query(query, [id], (err, rows) => {
    if (err) {
      throw err;
    }
    const userInfo = {
      id: rows[0].id,
      userName: rows[0].userName,
    };

    done(null, userInfo);
  });
});
