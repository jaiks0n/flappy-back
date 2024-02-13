const { addUserModel } = require('../models/usersModel');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const user = await addUserModel(req.body);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(400).send('Incorrect password');
      }
      if (err) {
        return res.status(500).send(err);
      }
      if (result) {
        const token = jwt.sign(
          { _id: user._id, isAdmin: user.isAdmin },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: '1h' }
        );
        //res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        res.send({ token: token, nickname: user.nickname, score: user.score });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const checkStatus = (req, res) => {
  try {
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const logOut = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      res.clearCookie('token');
    }
    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { signup, login, checkStatus, logOut };
