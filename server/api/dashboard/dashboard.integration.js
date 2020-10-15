/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAdminanalyze;

describe('Adminanalyze API:', function() {
  describe('GET /y', function() {
    var adminanalyzes;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          adminanalyzes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(adminanalyzes).to.be.instanceOf(Array);
    });
  });

  describe('POST /y', function() {
    beforeEach(function(done) {
      request(app)
        .post('/y')
        .send({
          name: 'New Adminanalyze',
          info: 'This is the brand new adminanalyze!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAdminanalyze = res.body;
          done();
        });
    });

    it('should respond with the newly created adminanalyze', function() {
      expect(newAdminanalyze.name).to.equal('New Adminanalyze');
      expect(newAdminanalyze.info).to.equal('This is the brand new adminanalyze!!!');
    });
  });

  describe('GET /y/:id', function() {
    var adminanalyze;

    beforeEach(function(done) {
      request(app)
        .get(`/y/${newAdminanalyze._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          adminanalyze = res.body;
          done();
        });
    });

    afterEach(function() {
      adminanalyze = {};
    });

    it('should respond with the requested adminanalyze', function() {
      expect(adminanalyze.name).to.equal('New Adminanalyze');
      expect(adminanalyze.info).to.equal('This is the brand new adminanalyze!!!');
    });
  });

  describe('PUT /y/:id', function() {
    var updatedAdminanalyze;

    beforeEach(function(done) {
      request(app)
        .put(`/y/${newAdminanalyze._id}`)
        .send({
          name: 'Updated Adminanalyze',
          info: 'This is the updated adminanalyze!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAdminanalyze = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdminanalyze = {};
    });

    it('should respond with the updated adminanalyze', function() {
      expect(updatedAdminanalyze.name).to.equal('Updated Adminanalyze');
      expect(updatedAdminanalyze.info).to.equal('This is the updated adminanalyze!!!');
    });

    it('should respond with the updated adminanalyze on a subsequent GET', function(done) {
      request(app)
        .get(`/y/${newAdminanalyze._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let adminanalyze = res.body;

          expect(adminanalyze.name).to.equal('Updated Adminanalyze');
          expect(adminanalyze.info).to.equal('This is the updated adminanalyze!!!');

          done();
        });
    });
  });

  describe('PATCH /y/:id', function() {
    var patchedAdminanalyze;

    beforeEach(function(done) {
      request(app)
        .patch(`/y/${newAdminanalyze._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Adminanalyze' },
          { op: 'replace', path: '/info', value: 'This is the patched adminanalyze!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAdminanalyze = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAdminanalyze = {};
    });

    it('should respond with the patched adminanalyze', function() {
      expect(patchedAdminanalyze.name).to.equal('Patched Adminanalyze');
      expect(patchedAdminanalyze.info).to.equal('This is the patched adminanalyze!!!');
    });
  });

  describe('DELETE /y/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/y/${newAdminanalyze._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when adminanalyze does not exist', function(done) {
      request(app)
        .delete(`/y/${newAdminanalyze._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
