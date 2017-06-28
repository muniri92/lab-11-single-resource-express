'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

// npm modules
const expect = require('expect');
const superagent = require('superagent');

const User = require('../model/user.js');
const server = require('../lib/server.js');

let tempNote;
const API_URL = process.env.API_URL;

describe('test user router', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/user', () => {
    after(() => User.remove({}));

    let data = {
      firstname: 'Munir',
      lastname: 'Ibrahim',
      age: 24,
    };

    it('should respond with a note and 200 status', () => {
      console.log(`${API_URL}/api/user`);
      return superagent.post(`${API_URL}/api/user`)
      .send(data)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.firstname).toEqual(data.firstname);
        expect(res.body.lastname).toEqual(data.lastname);
        expect(res.body.age).toEqual(data.age);
      });
    });

    it('should respond with a 409 status (duplicates)', () => {

    });

    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/user`)
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/user`)
      .send({firstname: 'Munir'})
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/user`)
      .send({lastname: 'Munir'})
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/user`)
      .send({age: 24})
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('test GET /api/user/:id', () => {
    var tempNote;

    after(() => User.remove({}));
    beforeEach(() => {
      return User({
        firstname: 'Munir',
        lastname: 'Ibrahim',
        age: 24,
      })
      .save()
      .then(note => {
        tempNote = note;
      });
    });

    it('should respond with a 200 status', () => {
      return superagent.get(`${API_URL}/api/user/${tempNote.id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });

    it('should respond with a 404 status', () => {
      return superagent.get(`${API_URL}/api/user/1`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });

  });

  describe('test PUT /api/user/:id', () => {
    var tempNote;

    after(() => User.remove({}));
    beforeEach(() => {
      return User({
        firstname: 'Munir',
        lastname: 'Ibrahim',
        age: 25,
      })
      .save()
      .then(note => {
        tempNote = note;
      });
    });

    let data = {
      firstname: 'Osheen',
      lastname: 'Collen',
      age: 23,
    };

    it('should update and respond with 200', () => {
      return superagent.put(`${API_URL}/api/user/${tempNote.id}`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempNote.id);
        expect(res.body.firstname).toEqual(data.firstname);
        expect(res.body.lastname).toEqual(data.lastname);
        expect(res.body.created).toExist();
        expect(res.body.age).toEqual(data.age);
      });
    });

    it('should respond with a 200', () => {
      return superagent.put(`${API_URL}/api/user/${tempNote.id}`)
      .send({ firstname: 'Vanessa' })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.firstname).toEqual('Vanessa');
        expect(res.body.lastname).toEqual('Ibrahim');
        expect(res.body.age).toEqual(25);
        expect(res.body.created).toExist();
      });
    });

    it('should respond with a 404', () => {
      return superagent.put(`${API_URL}/api/user/1`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('test DELETE /api/user/:id', () => {
    after(() => User.remove({}));

    let data = {
      firstname: 'Hamsa',
      lastname: 'Fayed',
      age: 23,
    };

    beforeEach(() => {
      return User(data)
      .save()
      .then(note => {
        tempNote = note;
      });
    });


    it('should respond with a 200 status', () => {
      return superagent.delete(`${API_URL}/api/user/${tempNote.id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.firstname).toEqual(data.firstname);
        expect(res.body.lastname).toEqual(data.lastname);
        expect(res.body.age).toEqual(data.age);
      });
    });

    it('should respond with a 404 status', () => {
      return superagent(`${API_URL}/api/user/2`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });

  });
});
