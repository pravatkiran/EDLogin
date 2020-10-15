/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var adminanalyzeCtrlStub = {
  index: 'adminanalyzeCtrl.index',
  show: 'adminanalyzeCtrl.show',
  create: 'adminanalyzeCtrl.create',
  upsert: 'adminanalyzeCtrl.upsert',
  patch: 'adminanalyzeCtrl.patch',
  destroy: 'adminanalyzeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var adminanalyzeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './adminanalyze.controller': adminanalyzeCtrlStub
});

describe('Adminanalyze API Router:', function() {
  it('should return an express router instance', function() {
    expect(adminanalyzeIndex).to.equal(routerStub);
  });

  describe('GET /y', function() {
    it('should route to adminanalyze.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'adminanalyzeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /y/:id', function() {
    it('should route to adminanalyze.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'adminanalyzeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /y', function() {
    it('should route to adminanalyze.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'adminanalyzeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /y/:id', function() {
    it('should route to adminanalyze.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'adminanalyzeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /y/:id', function() {
    it('should route to adminanalyze.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'adminanalyzeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /y/:id', function() {
    it('should route to adminanalyze.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'adminanalyzeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
