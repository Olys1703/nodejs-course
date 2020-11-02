const router = require('express').Router();

const usersService = require('./user.service.js');

/**
 * Get users
 * Create login
 */
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getUsers();

      return res.json(users);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await usersService.createUser(req.body);

      return res.json(newUser);
    } catch (err) {
      return next(err);
    }
  });

/**
 * Get login
 * Update login
 * Delete login
 */
router
  .route('/:userId')
  .get(async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await usersService.getUser(userId);

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { userId } = req.params;

      const updatedUser = await usersService.updateUser(userId, req.body);

      return res.json(updatedUser);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { userId } = req.params;

      const deletedUserId = await usersService.deleteUser(userId);

      return res.json({ id: deletedUserId });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
