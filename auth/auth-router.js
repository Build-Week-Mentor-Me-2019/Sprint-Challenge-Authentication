const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({ saved })
    })
    .catch(err => {
      res.status(500).json({
        message: "Error"
      })
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const tokenPayload = {
          userId: user.id
        }
        res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET))
        res.status(200).json({
          message: "Welcome!"
        })
      } else {
        res.status(401).json({
          message: "Unable to log in"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error"
      })
    })
});

module.exports = router;
