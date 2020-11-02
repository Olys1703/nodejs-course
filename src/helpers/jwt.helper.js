const jwt = require('jsonwebtoken');

const config = require('../common/config.js');

const generateToken = user =>
  new Promise((res, rej) => {
    jwt.sign(
      { userId: user._id, login: user.login },
      config.JWT_SECRET_KEY,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          rej(err);
        }

        res(token);
      }
    );
  });

const checkToken = async token =>
  new Promise((res, rej) => {
    jwt.verify(token, config.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        rej(err);
      }

      res(decodedToken);
    });
  });

module.exports = {
  generateToken,
  checkToken
};
