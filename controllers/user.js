const User = require('../models/user');

exports.postDisplayUsers = (req, res) => {
  User
    .find()
    .then((users) => {
      if (users.length) {
        res.render('users');
      } else {
        res.render('nothing');
      }
    })
    .catch(() => {
      res.status(500).render('error');
    });
};

exports.getMainPage = (req, res) => {
  res.render('main');
};
