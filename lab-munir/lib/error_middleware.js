'use strict';

module.exports = (err, req, res, next) => {
  // if validation error respond with 400 status
  if (err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  // if dup key respond with 409 status
  if (err.message.includes('duplicate key'))
    return res.sendStatus(409);

  // if id not collection, respond with 404
  if (err.name.toLowerCase().includes('casterror'))
    return res.sendStatus(404);

  // otherwise respond with 500 status
  res.sendStatus(500);
  next();
};
