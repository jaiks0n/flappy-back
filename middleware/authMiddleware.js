const {
  getUserByEmailModel,
  getUserByNicknameModel,
} = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const passwordsMatch = (req, res, next) => {
  const { password, rePassword } = req.body;
  if (password === rePassword) {
    next();
  } else {
    res.status(400).send('Passwords dont match');
  }
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send('User already exists');
  } else {
    next();
  }
};
const isExistingNicknameUser = async (req, res, next) => {
  const user = await getUserByNicknameModel(req.body.nickname);
  if (user) {
    res.status(400).send('Nickname already use by someone else');
  } else {
    next();
  }
};

const hashPwd = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing');
    }

    req.body.password = hash;
    delete req.body.rePassword;
    next();
  });
};

const isExistingUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    req.body.user = user;
    next();
  } else {
    res.status(400).send('User does not exist');
  }
};

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send('Token required');
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    } else if (decoded) {
      req.body.userId = decoded._id;
      next();
    } else {
      res.status(500).send('Error verifying token');
    }
  });

  req.cookies.token;
};

module.exports = {
  passwordsMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  auth,
  isExistingNicknameUser,
};
