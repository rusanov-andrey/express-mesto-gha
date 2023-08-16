const router = require('express').Router();
const {
  getUserss, createUser, getOneUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUserss);
router.post('/users', createUser);
router.get('/users/:userId', getOneUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
