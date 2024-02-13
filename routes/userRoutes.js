const express = require('express');
const UsersController = require('../controllers/usersController');
const { signupSchema, loginSchema } = require('../schemas/schemas');
const { validateBody } = require('../middleware/validateBody');
const {
  passwordsMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  isExistingNicknameUser,
  auth,
} = require('../middleware/authMiddleware');
const router = express.Router();



router.post(
  '/signup',
  validateBody(signupSchema),
  isNewUser,
  isExistingNicknameUser,
  hashPwd,
  UsersController.signup
);

router.post(
  '/login',
  validateBody(loginSchema),
  isExistingUser,
  UsersController.login
);

router.get('/check-status', auth, UsersController.checkStatus);

router.get("/", UsersController.getAllUsers)

/*router.get('/logout',UsersController.logOut )*/

module.exports = router;
