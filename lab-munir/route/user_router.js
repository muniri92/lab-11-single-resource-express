'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const User = require('../model/user.js');

// module logic
let userRouter = module.exports = new Router();

// POST route
userRouter.post('/api/user', jsonParser, (req, res, next) => {
  console.log('hit POST /api/user');

  new User(req.body)
  .save()
  .then((user) => res.json(user))
  .catch(next);
});

// GET route
userRouter.get('/api/user/:id', jsonParser, (req, res, next) => {
  console.log(`hit GET /api/user/${req.params.id}`);

  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next);
});

// PUT route
userRouter.put('/api/user/:id', jsonParser, (req, res, next) => {
  console.log(`hit PUT /api/user/${req.params.id}`);
  let options = {
    runValidators: true,
    new: true,
  };

  User.findByIdAndUpdate(req.params.id, req.body, options)
  .then(user => res.json(user))
  .catch(next);
});

// DELETE route
userRouter.delete('/api/user/:id', (req, res, next) => {
  console.log('hit DELETE /api/user/', req.params.id);

  User.findByIdAndRemove(req.params.id)
  .then(user => res.json(user))
  .catch(next);
});

//
userRouter.get('/api/users', (req, res, next) => {
  console.log('hit  GET /api/users');

  let usersArray = [];
  User.find({})
  .then(users => {
    users.forEach((user) => {
      usersArray.push(user._id);
    });
    return usersArray;
  })
  .then(arr => res.send(arr))
  .catch(next);
});
