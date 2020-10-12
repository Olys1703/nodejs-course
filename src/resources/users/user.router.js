const router = require('express').Router();

const usersService = require('./user.service.js');

/**
 * Get users
 * Create user
 */
router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getUsers();

    return res.json(users);
  })
  .post(async (req, res) => {
    const newUser = await usersService.createUser(req.body);

    return res.json(newUser);
  });

/**
 * Get user
 * Update user
 * Delete user
 */
router
  .route('/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;

    const user = await usersService.getUser(userId);

    if (!user) {
      return res.status(404).json({});
    }

    return res.json(user);
  })
  .put(async (req, res) => {
    const { userId } = req.params;

    const updatedUser = await usersService.updateUser(userId, req.body);

    return res.json(updatedUser);
  })
  .delete(async (req, res) => {
    const { userId } = req.params;

    const deletedUserId = await usersService.deleteUser(userId);

    return res.json({ id: deletedUserId });
  });

module.exports = router;
