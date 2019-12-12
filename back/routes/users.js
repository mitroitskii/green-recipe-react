const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const saltRounds = 10;

router.route('/isLogged')
  .get((req, res) => {
    res.json({ isLoggedIn: !!req.session.username })
  });


// отрисовка страниц регистрации и логина

router.route('/registration')
  .post(async (req, res, next) => {
    try {
      let user = await User.findOne({ username: req.body.username })
      if (user) {
        let registrationError = new Error('Такой пользователь уже существует');
        throw registrationError
      } else {
        let password = await bcrypt.hash(req.body.password, saltRounds)
        let user = new User({ username: req.body.username, password: password, email: req.body.email });
        await user.save()
        res.send({registrationStatus: 'Вы успешно зарегистрированы. Теперь войдите под своим логином и паролем.'})
      }
    } catch (error) {
      if(error.message === 'Такой пользователь уже существует') {
        console.log(error.message);
        res.status(400).json(error.message)
      }
    }
  });

router.route('/login')
  .post(async (req, res, error) => {
    try {
      let loginError = new Error('Неправильный логин или пароль. Попробуйте еще раз');
      const user = await User.findOne({ username: req.body.username });
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        req.session.username = user.username;
        res.send({ isLoggedIn: !!req.session.username, });
      } else {
        throw loginError
      }
    } catch (error) {    
      if(error.message === 'Неправильный логин или пароль. Попробуйте еще раз') {
        res.status(400).json(error.message)
      }
    }
  });

router.delete('/logout', async (req, res, next) => {
  if (req.session.username) {
    try {
      await req.session.destroy();
      res.clearCookie('cookie');
    } catch (error) {
      next(error);
    }
    res.json({ isLoggedIn: !!req.session })
  }
});


module.exports = router;
