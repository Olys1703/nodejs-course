const router = require('express').Router();

const login = require('./login.service.js');
const { generateToken } = require('../../helpers/jwt.helper.js');

/**
 * Login user
 */
router.route('/').post(async (req, res, next) => {
  try {
    const user = await login(req.body);
    const token = await generateToken(user);

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
